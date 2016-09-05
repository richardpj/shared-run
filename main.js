'use strict';

const runlib = require('./lib/runlib'),
    findDeps = require('./lib/findDeps');

module.exports = {
    runS: runlib.runS,
    runP: runlib.runP,
    findDeps: findDeps
};