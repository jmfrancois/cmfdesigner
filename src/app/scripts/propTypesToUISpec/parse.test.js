const parse = require('./parse');

describe('parse', () => {
	it('should create ast', () => {
		const ast = parse({ path: `${__dirname}/ExampleComponent.js` })
		expect(ast).toMatchSnapshot();
	});
});
