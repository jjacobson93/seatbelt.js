var Some = require('./option').Some;
var None = require('./option').None;

function Iter(values) {
	this.values = values !== undefined ? values : [];
	this._count = this.values && this.values.length !== undefined ? this.values.length : 0;
	this._curr = 0;
}

Iter.prototype.next = function() {
	var val = this.values[_curr++];
	return val !== undefined ? Some(val) : None;
}

Iter.prototype.count = function() {
	return _count;
}

Iter.prototype.last = function() {
	var val = this.values[_count-1];
	return val !== undefined ? Some(val) : None;
}

Iter.prototype.nth = function(n) {
	var val = this.values[n];
	return val !== undefined ? Some(val) : None;
}

Iter.prototype.chain = function(other) {
	return new Iter(this.values.concat(other.values));
}

exports.Iter = Iter;