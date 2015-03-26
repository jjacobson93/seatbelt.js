(function(exports) {
    var Result, Ok, Err,
        Option, None, Some;

    Result = (function() {
        var _value;
        var _isOk;

        function Result(value, isOk) {
            _value = value;
            _isOk = isOk;
        }

        Result.prototype.isOk = function() {
            return _isOk;
        }

        Result.prototype.isErr = function() {
            return !_isOk;
        }

        Result.prototype.ok = function() {
            return this.isOk() ? Some(_value) : None;
        }

        Result.prototype.err = Result.prototype.ok; // functionally the same

        Result.prototype.asArray = function() {
            return this.isOk() ? [_value] : [];
        }

        Result.prototype.map = function(fn) {
            if (this.isOk()) _value = fn(_value);
            return this;
        }

        Result.prototype.mapErr = function(fn) {
            if (this.isErr()) _value = fn(_value);
            return this;
        }

        Result.prototype.and = function(res) {
            return this.isOk() ? res : this;
        }

        Result.prototype.andThen = function(fn) {
            return this.isOk() ? fn() : this;
        }

        Result.prototype.or = function(res) {
            return this.isErr() ? res : this;
        }

        Result.prototype.orElse = function(fn) {
            return this.isErr() ? fn() : this;
        }

        Result.prototype.unwrap = function() {
            if (this.isOk()) return _value;
            throw new Error(_value);
        }

        Result.prototype.unwrapErr = function() {
            if (this.isErr()) return _value;
            throw new Error(_value);
        }

        Result.prototype.unwrapOr = function(opt) {
            return this.isOk() ? _value : opt;
        }

        Result.prototype.unwrapOrElse = function(fn) {
            return this.isOk() ? _value : fn();
        }

        return Result;
    })();

    Ok = function(value) {
        return new Result(value, true);
    }

    Err = function(value) {
        return new Result(value, false);
    }

    Option = (function() {
        var _value;
        var _isSome;

        function Option(value, isSome) {
            _value = value;
            _isSome = isSome;
        }

        Option.prototype.isNone = function() {
            return !_isSome;
        }

        Option.prototype.isSome = function() {
            return _isSome;
        }

        Option.prototype.asArray = function() {
            return (this.isSome()) ? [_value] : [];
        }

        Option.prototype.unwrap = function() {
            if (this.isSome()) return _value;
            throw new Error("Option is None");
        }

        Option.prototype.unwrapOr = function(def) {
            return this.isSome() ? _value : def;
        }

        Option.prototype.unwrapOrElse = function(fn) {
            return this.isSome() ? obj : fn();
        }

        Option.prototype.map = function(fn) {
            if (this.isSome()) return fn(_value);
            throw new Error("Option is None");
        }

        Option.prototype.mapOr = function(def, fn) {
            return this.isSome() ? fn(_value) : def;
        }

        Option.prototype.mapOrElse = function(defFn, fn) {
            return this.isSome() ? fn(_value) : defFn(_value);
        }

        Option.prototype.expect = function(msg) {
            if (this.isSome()) return _value;
            throw new Error(msg);
        }

        Option.prototype.okOr = function(err) {
            if (this.isSome()) return Ok(_value);
            return Err(err);
        }

        Option.prototype.okOrElse = function(err) {
            if (this.isSome()) return Ok(_value);
            return Err(err());
        }

        Option.prototype.and = function(opt) {
            if (this.isNone()) return None;
            return opt;
        }

        Option.prototype.andThen = function(fn) {
            if (this.isNone()) return None;
            var res = fn(_value);
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
            _value = null;
            _isSome = false;
            return this;
        }

        return Option;
    })();

    None = new Option(null, false);
    Some = function(value) {
        return new Option(value, true);
    }

    exports.Option = Option
    exports.None = None;
    exports.Some = Some;

    exports.Result = Result;
    exports.Ok = Ok;
    exports.Err = Err;
})(this);