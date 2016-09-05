
var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    main = require('../main');

chai.use(chaiAsPromised);
chai.should();

var runS = main.runS;
var runP = main.runP;

describe("runlib", function() {
    describe('#runS', function () {
        it('should throw when passed an illegal command', function () {
            (function () {
                runS(['.'], 'fgbaeenadfh');
            }).should.throw();
        });
        it('should NOT throw when passed a legal command', function () {
            (function () {
                runS(['.'], 'exit');
            }).should.not.throw();
        });
    });

    describe('#runP', function () {
        it('should reject when passed an illegal command', function (done) {
            (runP(['.'], 'fgbaeenadfh')).should.be.rejected.and.notify(done);
        });
        it('should fulfill when passed a legal command', function (done) {
            (runP(['.'], 'exit')).should.be.fulfilled.and.notify(done);
        });
    });
});
