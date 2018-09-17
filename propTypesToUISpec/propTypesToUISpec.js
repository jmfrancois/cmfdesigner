const fs = require('fs');
const recast = require('recast');
const parser = require("recast/parsers/babylon");


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
			console.log({ acc, current });
			return {
				...acc,
				[current.expression.left.object.name]: current.expression.right,  // MyFunction
			};
		}, {});
}

const AST_TO_JSONSCHEMA_TYPE = {
	string: 'string',
};

function getJSONSchemaType(ast, propTypeId) {
	// check if foo: PropTypes.xxx
	if (
		ast.value.type === 'MemberExpression' &&
		ast.value.object.name === propTypeId &&
		AST_TO_JSONSCHEMA_TYPE[ast.value.property.name]
	) {
		return AST_TO_JSONSCHEMA_TYPE[ast.value.property.name];
	}
	console.log('propTypes type not found:', ast.value.property.name);
	return 'string';
}

function astToUISpec(ast, propTypeId) {
	const defaultUISpec = {
		jsonSchema: {
			type: 'object',
			properties: {},
			required: [],
		},
		uiSchema: [],
		properties: {},
	};
	ast.properties.reduce((acc, current) => {
		if (current.type === 'Property') {
			acc.jsonSchema.properties[current.key.name] = {
				type: getJSONSchemaType(current),
			};
			acc.uiSpec.push({
				key: current.key.name,
			});
		}
	}, defaultUISpec);
}

/**
 * this script take the path of a component as argument
 * it will try to find the propTypes.
 * If propTypes found it will generate the UISpec of it
 */

function parse(options) {
	console.log('read file', options.path);
	const code = fs.readFileSync(options.path);
	console.log('parse it')
	const ast = recast.parse(code, { parser });
	const propTypeId = getPropTypesId(ast);
	console.log('propTypeId', propTypeId);
	const propTypesExpression = getAssigment(ast, propTypeId);
	const uiSpec = astToUISpec(propTypesExpression, propTypeId);
	console.log(uiSpec);
}

const cwd = process.cwd();
console.log(cwd, __dirname);
if (__dirname === cwd) {
	parse({ path: '../src/app/components/ViewProps/ViewProps.component.js' });
}
