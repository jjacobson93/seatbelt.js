var option = require('../lib/option');
var result = require('../lib/result');

var Some = option.Some;
var None = option.None;

var Ok = result.Ok;
var Err = result.Err;

describe('Result', function() {
	describe('#isOk', function() {
		it('should return true', function() {
			Ok(1).isOk().should.be.true();
		});

		it('should return false', function() {
			Err(1).isOk().should.be.false();
		});
	});

	describe('#isErr', function() {
		it('should return true', function() {
			Err(1).isErr().should.be.true();
		});

		it('should return false', function() {
			Ok(1).isErr().should.be.false();
		});
	});

	describe('#ok', function() {
		it('should return Some(1)', function() {
			Ok(1).ok().should.be.eql(Some(1));
		});
	});

	describe('#asArray', function() {

	});

	describe('#map', function() {

	});

	describe('#mapErr', function() {

	});

	describe('#and', function() {

	});

	describe('#andThen', function() {

	});

	describe('#or', function() {

	});

	describe('#orElse', function() {

	});

	describe('#unwrap', function() {

	});

	describe('#unwrapErr', function() {

	});

	describe('#unwrapOr', function() {

	});

	describe('#unwrapOrElse', function() {

	});
});