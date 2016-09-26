'use strict';

var fs = require('fs');
var path = require('path');

var lcov = fs.readFileSync(path.join(__dirname, 'coverage/lcov.info'), 'utf8');
var relcov = lcov;
var regex = /^SF:(.*)$/gm;

var match = regex.exec(lcov);

while (match) {
    var relPath = path.relative(__dirname, match[1]);
    relcov = relcov.replace(match[1], relPath);
    match = regex.exec(lcov);
}

fs.writeFileSync(path.join(__dirname, 'coverage/lcov.info'), relcov, 'utf8');
