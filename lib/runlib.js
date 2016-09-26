'use strict';

const path = require('path'),
    child_process = require('child_process'),
    style = require('./style');

const exec = child_process.exec,
    execSync = child_process.execSync;

function logRunning(dep, cmd) {
    console.log();
    console.log(style.info('Running: '), style.path(dep), style.info(`${cmd}...`));
} 

function runS(deps, cmd) {
    deps.forEach(dep => {
        logRunning(dep, cmd);
        execSync(cmd, {
            cwd: dep,
            stdio: 'inherit'
        });
    });
}

function runP(deps, cmd) {
    var promiseList = deps.map(dep => {
        return new Promise((resolve, reject) => {
            logRunning(dep, cmd);
            let proc = exec(cmd, {
                cwd: dep
            });
            proc.stdout.pipe(process.stdout);
            proc.stderr.pipe(process.stderr);
            proc.on('close', (code) => code === 0 ? resolve(): reject(new Error(`${dep} ${cmd} exited with code: ${code}`)));
        });
    });
    return Promise.all(promiseList);
}

module.exports = {
    runS,
    runP
};