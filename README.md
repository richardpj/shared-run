
# shared-run

[![Build Status][1]][2] [![Test Coverage][3]][4] [![Code Climate][5]][6] [![Issue Count][7]][6]

CLI tool that runs a shell command (serially or in parallel) against all detected local shared
dependencies based on the package.json in the current working directory. This is especially 
useful for npm scripts when using npm to modularize a project. Other related tools that you may
find useful:

* [npm-run-all](https://www.npmjs.com/package/npm-run-all)
* [npm-link-shared](https://www.npmjs.com/package/npm-link-shared)

## Installation

This module is designed to reduce npm script boilerplate and should be used as a project dev
dependency (npm scripts can run locally installed CLI packages).

```
npm install shared-run --save-dev
```

...but if you must you can install it globally.

```
npm install shared-run -g
```

## Changelog

v1.0.3 (2016-09-12) - Initial release.

## Usage

```
shared-run [-p|-parallel] [-np|-noProd] [-d|-dev] [-f|-filter <comma separated module name filter>] [shell command]
```

For example:

```
shared-run
```

Useful for testing, this lists detected local dependencies from the current working directory
package.json in sequential execution order. The order is most deeply nested first then reverse
order of appearance in package.json.

You can test out the command line switches (and package.json dependency order) by not
specifying a shell command. Once you are satisfied with the behaviour you are good to go! 

```
shared-run npm install
```

This will run npm install with the current working directory set to the dependency folder
(equivalent to ```cd <dependency folder> && npm install```) for each detected local dependency
in sequential execution order.

## Issues

shared-run uses a fairly naive dependency resolution algorithm.  It will handle circular dependencies
but the execution order may not suit.  If you have use cases for which you would like different
behaviour please don't hesistate to [log an issue](https://github.com/richardpj/shared-run/issues).

## LICENSE

[MIT](LICENSE)

[1]: https://travis-ci.org/richardpj/shared-run.svg?branch=master
[2]: https://travis-ci.org/richardpj/shared-run
[3]: https://codeclimate.com/github/richardpj/shared-run/badges/coverage.svg
[4]: https://codeclimate.com/github/richardpj/shared-run/coverage
[5]: https://codeclimate.com/github/richardpj/shared-run/badges/gpa.svg
[6]: https://codeclimate.com/github/richardpj/shared-run
[7]: https://codeclimate.com/github/richardpj/shared-run/badges/issue_count.svg
