'use strict';

const path = require('path'),
    fs = require('fs'),
    style = require('./style'),
    _ = require('lodash');

function findDeps(depPath, noProd, dev, filter) {
    let packagePath = path.join(depPath, 'package.json');

    if (!fs.existsSync(packagePath)) {
        console.log(style.warn("Skipping: "), style.path(depPath), style.warn("\nNo package.json found."));
        return [];
    }
 
    let packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    let dependencies = Object.assign({}, noProd ? {} : packageJson.dependencies, dev ? packageJson.devDependencies : {});

    let filterArray = filter || [];
    filterArray = typeof filter == 'string' ? filter.split(',') : filterArray;

    let localDeps = Object.keys(dependencies)
        .filter(filterArray && filterArray.length > 0 ? (item) => filterArray.indexOf(item) == -1 : () => true)
        .map((key) => { return { key, value:dependencies[key]}; })
        .filter((item) => {
            try {
                return fs.lstatSync(path.resolve(depPath, item.value)).isDirectory;
            }
            catch (err) {
                return false;
            }
        })
        .map((item) => {
            filterArray.push(item.key);
            return path.resolve(depPath, item.value);
        });
    let localChildDeps = localDeps.map((localDep) => findDeps(localDep, noProd, dev, filterArray))
        .forEach((foundArr) => {
            let itemsToAdd = foundArr.filter(item => localDeps.indexOf(item) == -1);
            localDeps = localDeps.concat(itemsToAdd);
        });
    
    return localDeps.reverse();
}

module.exports = findDeps;
