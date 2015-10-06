var option = require('./lib/option');
var result = require('./lib/result');

exports.Option = option.Option;
exports.None = option.None;
exports.Some = option.Some;

exports.Result = result.Result;
exports.Ok = result.Ok;
exports.Err = result.Err;