const get = require('lodash/get');

function getFnParamName(param) {
	return param.name || get(param, 'left.name') || get(param, 'argument.name');
}


function getFnProperties(param) {
	if (param.type !== 'ObjectPattern') {
		return [];
	}
	return param.properties.map(prop => ({
		shorthand: prop.shorthand,
		name: prop.key.name,
	}));
}

function getDefaultValue(param) {
	if (param.type !== 'AssignmentPattern') {
		return undefined;
	}
	const info = { type: param.right.type };
	if (info.type === 'ObjectExpression') {
		info.length = get(param, 'right.elements.length');
	}
	if (info.type === 'Literal') {
		info.value = get(param, 'right.value');
	}
	if (info.type === 'ArrayExpression') {
		info.length = get(param, 'right.elements.length');
	}
	return info;
}

/**
 *
 * @param {Object} fn ast representation of a function
 * @return {Object} info
 * @example
 * function foo(param, baz = {}, { foo }, ...bar) {}
 * ->
	[
		{ type: 'Identifier', name: 'param' },
		{ type: 'AssignmentPattern', name: 'bar', valueType: 'ObjectExpression' },
		{ type: 'ObjectPattern', properties: [ { name: foo, shorthand: true } ] },
	]
 */
module.exports = function getFunctionParams(fn) {
	return (fn.params || []).map(param => ({
		type: param.type,
		name: getFnParamName(param),
		properties: getFnProperties(param),
		defaultValue: getDefaultValue(param),
	}));
};
