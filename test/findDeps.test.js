
var findDeps = require('../main').findDeps,
    path = require('path'),
    should = require('chai').should();


describe('#findDeps', function () {

    it('should return an empty array when no package.json is found.', function () {
        findDeps('./test/target').should.deep.equal([]);
    });

    it('should return the correct local dependencies when invoked with no switches.', function () {
        findDeps('./test/target/module-a')
            .should.deep.equal
            ([
                path.resolve('./test/target/module-c'),
                path.resolve('./test/target/another-dep'),
                path.resolve('./test/target/module-b')
            ]);
    });

    it('should also scan devDependencies when the -dev switch is specified.', function () {
        findDeps('./test/target/module-a', false, true)
            .should.deep.equal
            ([
                path.resolve('./test/target/module-c'),
                path.resolve('./test/target/dev-dep'),
                path.resolve('./test/target/another-dep'),
                path.resolve('./test/target/module-b')
            ]);
    });

    it('should ONLY scan devDependencies when the -noProd and -dev swithes are specified.', function () {
        findDeps('./test/target/module-a', true, true)
            .should.deep.equal
            ([
                path.resolve('./test/target/dev-dep'),
            ]);
    });
    
    it('should apply the comma delimited string filter option.', function () {
        findDeps('./test/target/module-a', false, true, 'another-dep,dev-dep')
            .should.deep.equal
            ([
                path.resolve('./test/target/module-c'),
                path.resolve('./test/target/module-b')
            ]);
    });
});