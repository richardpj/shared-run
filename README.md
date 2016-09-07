# shared-run

![build status](https://api.travis-ci.org/richardpj/shared-run.svg?branch=master)

CLI tool that runs a shell command (serially or in parallel) against all detected local shared dependencies based on the
package.json in the current working directory. This is especially useful for npm scripts when using npm to modularize a
project. Other related tools that you may find useful:
* [npm-run-all](https://www.npmjs.com/package/npm-run-all)
* [npm-link-shared](https://www.npmjs.com/package/npm-link-shared)

## Installation

This module is designed to reduce npm script boilerplate and should be used as a project dev dependency (npm scripts can
run locally installed CLI packages).
```
npm install shared-run --save-dev
```
...but if you must you can install it globally.
```
npm install shared-run -g
```

## Changelog

v0.0.1 (2016-09-05) - Initial version.

## Usage

```
shared-run [-p|-parallel] [-np|-noProd] [-d|-dev] [-f|-filter <comma separated module name filter>] [shell command]
```

For example:

```
shared-run
```

Useful for testing, this lists detected local dependencies from the current working directory package.json in sequential
execution order. The order is most deeply nested first then reverse order of appearance in package.json.

You can test out the command line switches (and package.json dependency order) by not specifying a shell command. Once
you are satisfied with the behaviour you are good to go! 

```
shared-run npm install
```
This will run npm install with the the current working directory set to the dependency folder (equivalent to ```cd <dependency
folder> && npm install```) for each detected local dependency in sequential execution order.

## [LICENSE](LICENSE)

