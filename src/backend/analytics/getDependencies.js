function getDependencies(ast) {
	const imports = ast.program.body
		.filter(line => line.type === 'ImportDeclaration')
		.map(line => line.source.value);
	return {
		dependencies: imports.filter(i => !i.startsWith('.')),
		localDependencies: imports.filter(i => i.startsWith('.')),
	};
}

module.exports = getDependencies;
