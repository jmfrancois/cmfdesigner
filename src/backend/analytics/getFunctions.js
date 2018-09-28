function getFunctions(ast) {
	return ast.program.body.filter(line => line.type === 'FunctionDeclaration');
}

module.exports = getFunctions;
