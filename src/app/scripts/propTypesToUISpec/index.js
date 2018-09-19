const parse = require('./parse');
const toUISpec = require('./toUISpec');

module.export = function (options) {
	const uiSpec = toUISpec(parse(options));
	console.log(JSON.stringify(uiSpec, null, 2));
	return uiSpec;
};
