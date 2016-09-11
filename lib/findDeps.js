'use strict';

const path = require('path'),
    fs = require('fs'),
    style = require('./style'),
    _ = require('lodash');

function ensureFilterArray(filter) {
    return filter ? (typeof filter === 'string' ? filter.split(',') : filter) : [];
}

function getDependencies(depPath, noProd, dev) {
    let packagePath = path.join(depPath, 'package.json');

    if (!fs.existsSync(packagePath)) {
        console.log(style.warn("Skipping: "), style.path(depPath), style.warn("\nNo package.json found."));
        return [];
    }
 
    let packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    return Object.assign({}, noProd ? {} : packageJson.dependencies, dev ? packageJson.devDependencies : {});
}

function getLocalDependencies(depPath, dependencies, filterArray) {
    return Object.keys(dependencies)
        .filter(filterArray.length > 0 ? (item) => filterArray.indexOf(item) === -1 : () => true)
        .map((key) => { return { key, value:dependencies[key]}; })
        .filter((item) => {
            try {
                return fs.lstatSync(path.resolve(depPath, item.value)).isDirectory;
            }
            catch (err) {
                return false;
            }
        });
}

function findDeps(depPath, noProd, dev, filter) {
    let filterArray = ensureFilterArray(filter);

    let dependencies = getDependencies(depPath, noProd, dev);

    let localDependencies = getLocalDependencies(depPath, dependencies, filterArray);

    filterArray = filterArray.concat(localDependencies.map((dep) => dep.key));

    let dependencyPaths = localDependencies.map((dep) => path.resolve(depPath, dep.value));

    dependencyPaths.map((localDep) => findDeps(localDep, noProd, dev, filterArray))
        .forEach((itemsToAdd) => {
            let filteredItems = itemsToAdd.filter((item) => dependencyPaths.indexOf(item) === -1);
            dependencyPaths = dependencyPaths.concat(filteredItems);
        });

    return dependencyPaths.reverse();
}

module.exports = findDeps;
