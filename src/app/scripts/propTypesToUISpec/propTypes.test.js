const cases = require('jest-in-case');
const propTypes = require('./propTypes');
const parse = require('./parse');

function getPropTypesAST(type) {
	return {
		key: {
			type: 'Identifier',
			name: 'foo',
		},
		value: {
			type: 'MemberExpression',
			object: {
				name: 'PropTypes',
			},
			property: {
				name: type,
			},
		},
	};
}

describe('propTypes', () => {
	let ast;
	beforeEach(() => {
		ast = parse({ path: `${__dirname}/ExampleComponent.js` }).ast;
	});
	describe('getReactPropTypesVarName', () => {
		it('should getReactPropTypesVarName return the var name', () => {
			expect(propTypes.getReactPropTypesVarName(ast)).toBe('PropTypes');
		});
	});
	describe('getPropTypesAssigments', () => {
		it('should getPropTypesAssigments object', () => {
			const result = propTypes.getPropTypesAssigments(ast);
			expect(Object.keys(result)).toEqual(['MyComponent']);
			expect(result.MyComponent.type).toBe('ObjectExpression');
			expect(Object.keys(result.MyComponent.properties)).toHaveLength(16);
		});
	});
	describe('getJSONSchemaType', () => {
		cases(
			'getJSONSchemaType(ast)',
			opts => {
				expect(
					propTypes.getJSONSchemaType(getPropTypesAST(opts.type), 'PropTypes')
				).toBe(opts.expected);
			},
			[
				{
					type: 'string',
					expected: 'string',
				},
				{
					type: 'number',
					expected: 'number',
				},
				{
					type: 'bool',
					expected: 'boolean',
				},
				{
					type: 'array',
					expected: 'array',
				},
				{
					type: 'object',
					expected: 'object',
				},
				{
					type: 'oneOf',
					expected: 'string',
				},
				{
					type: 'arrayOf',
					expected: 'array',
				},
				{
					type: 'objectOf',
					expected: 'object',
				},
				{
					type: 'shape',
					expected: 'object',
				},
			],
		);
	});
});
