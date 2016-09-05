'use strict';

const path = require('path'),
    child_process = require('child_process'),
    style = require('./style');

const exec = child_process.exec,
    execSync = child_process.execSync;

function runS(deps, cmd) {
    deps.forEach(dep => {
        console.log();
        console.log(style.info('Running: '), style.path(dep), style.info(`${cmd}...`));
        execSync(cmd, {
            cwd: dep,
            stdio: 'inherit'
        });
    });
}

function runP(deps, cmd) {
    var p = new Promise((resolve, reject) => {
        deps.forEach(dep => {
            console.log();
            console.log(style.info('Running: '), style.path(dep), style.info(`${cmd}...`));
            let proc = exec(cmd, {
                cwd: dep
            });
            proc.stdout.pipe(process.stdout);
            proc.stderr.pipe(process.stderr);
            proc.on('close', (code) => code == 0 ? resolve(): reject(code));
        });
    });
    return p;
}

module.exports = {
    runS,
    runP
};