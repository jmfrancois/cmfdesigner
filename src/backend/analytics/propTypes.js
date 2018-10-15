const get = require('lodash/get');

function isRequired(ast) {
	return get(ast, 'value.property.name') === 'isRequired';
}

function isPropTypes(ast) {
	let pointer = ast.value;
	if (isRequired(ast)) {
		pointer = ast.value.object;
	}
	const type = get(pointer, 'type');
	let result = false;
	if (type === 'MemberExpression') {
		result = get(pointer, 'object.name') === 'PropTypes';
	} else if (type === 'CallExpression') {
		result = get(pointer, 'callee.object.name') === 'PropTypes';
	}
	return result;
}

function getPropType(ast) {
	if (ast.type !== 'ObjectProperty') {
		return undefined;
	}
	let pointer = ast.value;
	if (isRequired(ast)) {
		pointer = pointer.object;
	}
	const subType = pointer.type;
	if (subType === 'Identifier') {
		// prop: PropTypes.string
		return get(pointer, 'name');
	}
	if (subType === 'CallExpression') {
		const calleeType = get(pointer, 'callee.type');
		if (calleeType === 'MemberExpression') {
			// prop: PropTypes.arrayOf()
			return get(pointer, 'callee.property.name');
		}
	}
	if (subType === 'MemberExpression') {
		return get(pointer, 'property.name');
	}
	return undefined;
}

function getPropKey(ast) {
	return get(ast, 'key.name');
}

function getPropValue(ast) {
	return {
		requried: isRequired(ast),
		type: getPropType(ast),
	};
}

module.exports = function getPropTypes(ast) {
	if (ast.type !== 'ObjectExpression') {
		// eslint-disable-next-line no-console
		return {};
	}
	return ast.properties.reduce((acc, current) => {
		if (current.type === 'SpreadElement') {
			return acc;
		}
		if (isPropTypes(current)) {
			// eslint-disable-next-line no-param-reassign
			acc[getPropKey(current)] = getPropValue(current);
		}
		return acc;
	}, {});
};
