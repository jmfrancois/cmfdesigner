const get = require('lodash/get');

function isIn(items, id) {
	return items.find(item => item === id) !== undefined;
}

function getExportInfo(declaration, data) {
	const info = {};
	if (declaration === null) {
		return info;
	}
	switch (declaration.type) {
		case 'Identifier':
			info.id = declaration.name;
			if (isIn(data.functions, declaration.name)) {
				info.type = 'function';
			} else if (isIn(data.vars, declaration.name)) {
				info.type = 'var';
			} else if (isIn(data.classes, declaration.name)) {
				info.type = 'class';
			} else if (isIn(data.imports, declaration.name)) {
				info.type = 'import';
			}
			break;
		case 'CallExpression':
			if (get(declaration, 'callee.callee.name') === 'cmfConnect') {
				info.type = 'cmfConnect';
			}
			break;
		case 'FunctionDeclaration':
			info.type = 'function';
			info.id = get(declaration, 'id.name', 'anonymous');
			break;
		default:
			break;
	}
	return info;
}

module.exports = function getExport(ast) {
	const data = {
		functions: ast.program.body.filter(line => line.type === 'FunctionDeclaration').map(fn => fn.id.name),
		classes: ast.program.body.filter(line => line.type === 'ClassDeclaration').map(fn => fn.id.name),
		vars: ast.program.body.filter(line => line.type === 'VariableDeclaration').reduce((acc, current) => {
			return acc.concat(current.declarations.map(declaration => declaration.id.name));
		}, []),
		imports: ast.program.body.filter(line => line.type === 'ImportDeclaration').reduce((acc, current) => {
			return acc.concat(current.specifiers.map(specifier => specifier.local.name));
		}, []),
	};

	const defaultExport = ast.program.body.filter(line => line.type === 'ExportDefaultDeclaration');
	const namedExport = ast.program.body.filter(line => line.type === 'ExportNamedDeclaration');
	const allExports = namedExport.map(exp => ({
		default: false,
		...getExportInfo(exp.declaration, data),
	}));
	if (defaultExport.length === 1) {
		allExports.push({
			default: true,
			...getExportInfo(defaultExport[0].declaration, data),
		});
	}
	return allExports;
};
