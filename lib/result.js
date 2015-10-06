var inherits = require('./util').inherits;

function Result(value) {
    this._value = value;
}

Result.prototype.isOk = function() {
    return false;
}

Result.prototype.isErr = function() {
    return false;
}

Result.prototype.ok = function() {
    // circular dependencies require this
    var Some = require('./option').Some;
    var None = require('./option').None;
    return this.isOk() ? Some(this._value) : None;
}

Result.prototype.err = Result.prototype.ok; // functionally the same

Result.prototype.asArray = function() {
    return this.isOk() ? [this._value] : [];
}

Result.prototype.map = function(fn) {
    if (this.isOk()) return new Ok(fn(this._value));
    return new Err(this._value);
}

Result.prototype.mapErr = function(fn) {
    if (this.isErr()) return new Err(fn(this._value));
    return new Ok(this._value);
}

Result.prototype.and = function(res) {
    return this.isOk() ? res : this;
}

Result.prototype.andThen = function(fn) {
    return this.isOk() ? fn(this._value) : this;
}

Result.prototype.or = function(res) {
    return this.isErr() ? res : this;
}

Result.prototype.orElse = function(fn) {
    return this.isErr() ? fn(this._value) : this;
}

Result.prototype.unwrap = function() {
    if (this.isOk()) return this._value;
    throw new Error(this._value);
}

Result.prototype.unwrapErr = function() {
    if (this.isErr()) return this._value;
    throw new Error(this._value);
}

Result.prototype.unwrapOr = function(opt) {
    return this.isOk() ? this._value : opt;
}

Result.prototype.unwrapOrElse = function(fn) {
    return this.isOk() ? this._value : fn(this._value);
}

var Ok = (function(_super){
    inherits(Ok, _super);

    function Ok(value) {
        if (!(this instanceof Ok)) {
            return new Ok(value);
        }

        _super.prototype.constructor.call(this, value);
    }

    Ok.prototype.isOk = function() {
        return true;
    }

    return Ok;
})(Result);

var Err = (function(_super){
    inherits(Err, _super);

    function Err(value) {
        if (!(this instanceof Err)) {
            return new Err(value);
        }

        _super.prototype.constructor.call(this, value);
    }

    Err.prototype.isErr = function() {
        return true;
    }

    return Err;
})(Result);

exports.Result = Result;
exports.Ok = Ok;
exports.Err = Err;