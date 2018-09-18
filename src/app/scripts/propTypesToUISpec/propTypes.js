

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

function getJSONSchemaType(ast, propTypeVarName) {
	// check if foo: PropTypes.xxx
	if (
		ast.value.type === 'MemberExpression' &&
		ast.value.object.name === propTypeVarName &&
		PROP_TYPE_TO_JSONSCHEMA_TYPE[ast.value.property.name]
	) {
		return PROP_TYPE_TO_JSONSCHEMA_TYPE[ast.value.property.name];
	}
	return undefined;
}

function getReactPropTypesVarName(ast) {
	const imports = ast.program.body
		.filter(line => line.type === 'ImportDeclaration')
		.filter(line => line.source.value === 'prop-types');
	for (let index = 0; index < imports.length; index++) {
		const current = imports[index];
		const specifier = current.specifiers.find(spec => spec.type === 'ImportDefaultSpecifier');
		if (specifier) {
			return specifier.local.name;
		}
	}
	return undefined;
}

function getPropTypesAssigments(ast) {
	return ast.program.body
	.filter(line => line.type === 'ExpressionStatement')
	.filter(line => line.expression.type === 'AssignmentExpression')
	.filter(line => line.expression.left)
	.filter(line => line.expression.left.property.name === 'propTypes')
	.reduce((acc, current) => ({
		...acc,
		[current.expression.left.object.name]: current.expression.right,  // MyFunction
	}), {});
}

module.exports = {
	getReactPropTypesVarName,
	getJSONSchemaType,
	getPropTypesAssigments,
};
