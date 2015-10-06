
exports.inherits = function inherits(c, s) {
	if (typeof Object.create === 'function') {
		c.prototype = Object.create(s.prototype, {
			constructor: {
				value: c,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
	} else {
		var TempCtor = function () {}
		TempCtor.prototype = s.prototype;
		c.prototype = new TempCtor();
		c.prototype.constructor = c;
	}
}