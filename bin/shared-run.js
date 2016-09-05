#!/usr/bin/env node

const findDeps = require('../lib/findDeps'),
    runlib = require('../lib/runlib'),
    style = require('../lib/style'),
    argv = require('minimist')(process.argv.slice(2), {
        boolean: [ 'parallel', 'no-prod', 'dev' ],
        string: [ 'filter' ],
        default: {
            p: false,
            np: false,
            d: false
        },
        alias: {
            parallel: 'p',
            'no-prod': 'np',
            dev: 'd',
            filter: 'f'
        }
    });

const runS = runlib.runS,
    runP = runlib.runP;

if(argv._.length > 0) {
    const command = argv._.join(' ');
}

const deps = findDeps(process.cwd(), argv.np, argv.d, argv.f);

if(deps.length == 0) {
    console.log(style.warn("No local dependencies found."));
    process.exit(0);
}

console.log(style.info(`Dependencies ${ argv.p ? 'for parallel execution' : 'in execution order'}...`));

deps.forEach((dep) => console.log(style.path(dep)));

if(!command) {
    process.exit(0);
}

console.log(style.info(`Running: ${command}...`));

if(argv.p) {
    runP(deps, command).catch((err) => { throw err; });
}
else {
    runS(deps, command);
}