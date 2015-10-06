var option = require('../lib/option');
var result = require('../lib/result');

var Some = option.Some;
var None = option.None;

var Ok = result.Ok;
var Err = result.Err;

describe('Option', function() {
	describe('#isSome()', function() {
		it('should return true for `Some(1)`', function() {
			Some(1).isSome().should.be.true();
		});

		it('should return false for `Some()`', function() {
			Some().isSome().should.be.false();
		});

		it('should return false for `None`', function() {
			None.isSome().should.be.false();
		});
	});

	describe('#isNone()', function() {
		it('should return true for `None`', function() {
			None.isNone().should.be.true();
		});

		it('should return false for `Some(1)`', function() {
			Some(1).isNone().should.be.false();
		});

		it('should return true for `Some()`', function() {
			Some().isNone().should.be.true();
		});
	});

	describe('#asArray', function() {
		it('should return an array [1]', function() {
			Some(1).asArray().should.eql([1]);
		});

		it('should return an array []', function() {
			None.asArray().should.eql([]);
		});
	});

	describe('#unwrap', function() {
		it('should return 1', function() {
			Some(1).unwrap().should.equal(1);
		});

		it('should throw `Option is None`', function() {
			None.unwrap.bind(None).should.throw('Option is None');
		});
	});

	describe('#unwrapOr', function() {
		it('should return 1', function() {
			Some(1).unwrapOr(2).should.equal(1);
		});

		it('should return 2', function() {
			None.unwrapOr(2).should.equal(2);
		});
	});

	describe('#unwrapOrElse', function() {
		it('should return 1', function() {
			Some(1).unwrapOrElse(function() { return 2 }).should.equal(1);
		});

		it('should return 2', function() {
			None.unwrapOrElse(function() { return 2 }).should.equal(2);
		});
	});

	describe('#map', function() {
		it('should return 5', function() {
			Some('Hello').map(function(s) { return s.length }).should.equal(5);
		});

		it('should throw `Option is None`', function() {
			None.map.bind(None).should.throw('Option is None');
		});
	});

	describe('#mapOr', function() {
		it('should return 5', function() {
			Some('Hello').mapOr(0, function(s) { return s.length }).should.equal(5);
		});

		it('should return -1', function() {
			None.mapOr(-1, function(s) { return s.length }).should.equal(-1);
		});
	});

	describe('#mapOrElse', function() {
		it('should return 5', function() {
			Some('Hello').mapOrElse(function() { return 1 }, function(s) { return s.length }).should.equal(5);
		});

		it('should return -1', function() {
			None.mapOrElse(function() { return -1 }, function(s) { return s.length }).should.equal(-1);
		});
	});

	describe('#expect', function() {
		it('should return 1', function() {
			Some(1).expect('Not some');
		});

		it('should throw `Uh oh!`', function() {
			None.expect.bind(None, 'Uh oh!').should.throw('Uh oh!');
		})
	});

	describe('#okOr', function() {
		it('should be `Ok(1)`', function() {
			Some(1).okOr('error').should.eql(Ok(1));
		});

		it('should be `Err("error")`', function() {
			None.okOr('error').should.eql(Err('error'));
		});
	});

	describe('#okOrElse', function() {
		it('should be `Ok(1)`', function() {
			Some(1).okOrElse(function() { return 0 }).should.eql(Ok(1));
		});

		it('should be `Ok(0)`', function() {
			None.okOrElse(function() { return 0 }).should.eql(Ok(0));
		});
	});

	describe('#and', function() {
		it('should be `Some(2)`', function() {
			Some(1).and(Some(2)).should.eql(Some(2));
		});

		it('should be `None` with `Some(1) AND None`', function() {
			Some(1).and(None).should.eql(None);
		});

		it('should be `None` with `None AND Some(1)`', function() {
			None.and(Some(1)).should.eql(None);
		});
	});

	describe('#andThen', function() {
		it('should be `Some(2)`', function() {
			Some(1).andThen(function() { return Some(2) }).should.eql(Some(2));
		});

		it('should be `None` with `Some(1) AND None`', function() {
			Some(1).andThen(function() { return None }).should.eql(None);
		});

		it('should be `None` with `None AND Some(1)`', function() {
			None.andThen(function() { return Some(1) }).should.eql(None);
		});
	});

	describe('#or', function() {
		it('should be `Some(1)` with `Some(1) OR Some(2)`', function() {
			Some(1).or(Some(2)).should.eql(Some(1));
		});

		it('should be `Some(1)` with `Some(1) OR None`', function() {
			Some(1).or(None).should.eql(Some(1));
		});

		it('should be `Some(1)` with `None OR Some(1)`', function() {
			None.or(Some(1)).should.eql(Some(1));
		});
	});

	describe('#orElse', function() {
		function nobody() { return None }
		function vikings() { return Some('vikings') }

		it("should return 'barbarians'", function() {
			Some('barbarians').orElse(vikings).should.eql(Some('barbarians'));
		});

		it("should return 'vikings'", function() {
			None.orElse(vikings).should.eql(Some('vikings'));
		});

		it("should return `None`", function() {
			None.orElse(nobody).should.eql(None);
		});
	});

	describe('#take', function() {
		it('should return `None` with `Some(1)`', function() {
			Some(1).take().should.eql(None);
		});

		it('should return `None` with `None`', function() {
			None.take().should.eql(None);
		});
	});
});