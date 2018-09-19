const fs = require('fs');
const recast = require('recast');
const parser = require('recast/parsers/babylon');

module.exports = function parse(options) {
	const code = fs.readFileSync(options.path);
	return {
		ast: recast.parse(code, { parser }),
	};
};
