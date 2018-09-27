
/**
 * return expression information
 * search criteria:
 * - is a function
 * - has arguments
 * - has a return statement
 * - is exported
 * - filePath contains /expressions/ or expressions.js
 */
function getExpressions(ast, filePath) {
	if (filePath.indexOf('/expressions/') === -1 && filePath.endsWith('expressions.js')) {
		return [];
	}
	return ast.program.body.filter(line => line.type === 'FunctionDeclaration')
	.filter(fn => fn.params.length > 0)
	.filter(fn => fn.body.body.find(item => item.type === 'ReturnStatement'))
	.reduce((acc, fn) => acc.concat({
		name: fn.id.name,
	}), []);
}

module.exports = getExpressions;
