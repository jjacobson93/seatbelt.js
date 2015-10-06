var inherits = require('./util').inherits;

function Option(value) {
    this._value = value;
}

Option.prototype.isNone = function() {
    return !(this._value !== undefined && this._value !== null);
}

Option.prototype.isSome = function() {
    return this._value !== undefined && this._value !== null;
}

Option.prototype.asArray = function() {
    return (this.isSome()) ? [this._value] : [];
}

Option.prototype.unwrap = function() {
    if (this.isSome()) return this._value;
    throw new Error("Option is None");
}

Option.prototype.unwrapOr = function(def) {
    return this.isSome() ? this._value : def;
}

Option.prototype.unwrapOrElse = function(fn) {
    return this.isSome() ? this._value : fn();
}

Option.prototype.map = function(fn) {
    if (this.isSome()) return fn(this._value);
    throw new Error("Option is None");
}

Option.prototype.mapOr = function(def, fn) {
    return this.isSome() ? fn(this._value) : def;
}

Option.prototype.mapOrElse = function(defFn, fn) {
    return this.isSome() ? fn(this._value) : defFn(this._value);
}

Option.prototype.expect = function(msg) {
    if (this.isSome()) return this._value;
    throw new Error(msg);
}

Option.prototype.okOr = function(err) {
    // Circular dependencies
    var Ok = require('./result').Ok;
    var Err = require('./result').Err;
    if (this.isSome()) return Ok(this._value);
    return Err(err);
}

Option.prototype.okOrElse = function(err) {
    // Circular dependencies
    var Ok = require('./result').Ok;
    var Err = require('./result').Err;
    if (this.isSome()) return Ok(this._value);
    return Err(err());
}

Option.prototype.and = function(opt) {
    if (this.isNone()) return None;
    return opt;
}

Option.prototype.andThen = function(fn) {
    if (this.isNone()) return None;
    var res = fn(this._value);
    if (!(res instanceof Option)) {
        return (res === undefined || res === null) ? None : Some(res);
    }

    return res;
}

Option.prototype.or = function(opt) {
    if (this.isSome()) return this;
    return opt;
}

Option.prototype.orElse = function(fn) {
    if (this.isSome()) return this;
    var res = fn();
    if (!(res instanceof Option)) {
        return (res === undefined || res === null) ? None : Some(res);
    }

    return res;
}

Option.prototype.take = function() {
    this._value = undefined;
    return this;
}

var None = (function(_super) {
    inherits(None, _super);

    function None() {
        if (!(this instanceof None)) {
            return new None();
        }

        _super.prototype.constructor.call(this);
    }

    return None;
})(Option);

None = new None();

var Some = (function(_super) {
    inherits(Some, _super);

    function Some(value) {
        if (value === undefined || value === null) {
            return None;
        } else if (!(this instanceof Some)) {
            return new Some(value);
        }

        _super.prototype.constructor.call(this, value);
    }

    return Some;
})(Option);

exports.Option = Option;
exports.None = None;
exports.Some = Some;