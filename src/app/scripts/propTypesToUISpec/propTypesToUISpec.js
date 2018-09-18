const fs = require('fs');
const recast = require('recast');
const parser = require("recast/parsers/babylon");
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

function getPropTypesId(ast) {
	console.log('getPropTypesId');
	let id;
	ast.program.body
		.filter(line => line.type === 'ImportDeclaration')
		.filter(line => line.source.value === 'prop-types')
		.forEach(current => {
			const specifier = current.specifiers.find(spec => spec.type === 'ImportDefaultSpecifier');
			if (specifier) {
				id = specifier.local.name;
			}
		});
	return id;
}

/**
 * MyFunction.propTypes = {}
 * @return {Object} key MyFunction, value ast of the propTypes
 */
function getAssigment(ast) {
	return ast.program.body
		.filter(line => line.type === 'ExpressionStatement')
		.filter(line => line.expression.type === 'AssignmentExpression')
		.filter(line => line.expression.left)
		.filter(line => line.expression.left.property.name === 'propTypes')
		.reduce((acc, current) => {
			return {
				...acc,
				[current.expression.left.object.name]: current.expression.right,  // MyFunction
			};
		}, {});
}

const PROP_TYPE_TO_JSONSCHEMA_TYPE = {
	string: 'string',
	number: 'number',
	bool: 'boolean',
	array: 'array',
	object: 'object',
	oneOf: 'string',
	arrayOf: 'array',
	objectOf: 'object',
	shape: 'object',
	// not supported
	func: undefined,
	instanceOf: undefined,
	symbol: undefined,
	element: undefined,
	node: undefined,
	oneOfType: undefined,
};

function getJSONSchemaType(ast, propTypeId) {
	// check if foo: PropTypes.xxx
	if (
		ast.value.type === 'MemberExpression' &&
		ast.value.object.name === propTypeId &&
		PROP_TYPE_TO_JSONSCHEMA_TYPE[ast.value.property.name]
	) {
		return PROP_TYPE_TO_JSONSCHEMA_TYPE[ast.value.property.name];
	}
	if (ast.value.type === 'MemberExpression') {
		console.warn('propTypes type not found:', ast.value.property.name);
	}
	return 'string';
}

function astToUISpec(propTypesExpression, propTypeId) {
	return Object.keys(propTypesExpression).reduce((acc, componentName) => {
		acc[componentName] = propTypesExpression[componentName].properties.reduce((buff, property) => {
			if (property.type === 'ObjectProperty') {
				const key = property.key.name;
				const type = getJSONSchemaType(property, propTypeId);
				if (type) {
					buff.jsonSchema.properties[key] = { type };
					buff.uiSchema.push({ key });
				}
			}
			return buff;
		}, {
			jsonSchema: {
				type: 'object',
				properties: {},
				required: [],
			},
			uiSchema: [],
			properties: {},
		});
		return acc;
	}, {});
}

/**
 * this script take the path of a component as argument
 * it will try to find the propTypes.
 * If propTypes found it will generate the UISpec of it
 */

module.exports = function parse(options) {
	console.log('read file', options.path);
	const code = fs.readFileSync(options.path);
	console.log('parse it');
	const ast = recast.parse(code, { parser });
	const propTypeId = getPropTypesId(ast);
	console.log('propTypeId', propTypeId);
	const propTypesExpression = getAssigment(ast, propTypeId);
	const uiSpec = astToUISpec(propTypesExpression, propTypeId);
	console.log(JSON.stringify(uiSpec, null, 2));
}
