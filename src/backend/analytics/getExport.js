const get = require('lodash/get');

function isIn(items, id) {
	return items.find(item => item.id === id) !== undefined;
}

function getFnParamName(param) {
	return param.name || get(param, 'left.name') || get(param, 'properties[0].key.name') || get(param, 'argument.name');
}

function getFunctionInfo(items, id) {
	const fn = items.find(item => item.id === id);
	return {
		generator: fn.generator,
		async: fn.async,
		params: (fn.params || []).map(param => ({
			type: param.type,
			name: getFnParamName,
		})),
	};
}

function getExportInfo(exportAST, data, filePath) {
	const info = {};
	if (exportAST.declaration === null) {
		// export { default as getApp } from './getApp';
		info.path = exportAST.source.value;
	} else {
		const declaration = exportAST.declaration;
		if (!declaration) {
			console.log('no declaration in ', filePath, exportAST);
		}
		info.name = declaration.name;
		info.declarationType = declaration.type;
		switch (declaration.type) {
			case 'Identifier':
				if (isIn(data.functions, declaration.name)) {
					info.type = 'function';
					Object.assign(info, getFunctionInfo(data.functions, declaration.name));
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
				info.generator = declaration.generator;
				info.async = declaration.async;
				info.params = (declaration.params || []).map(param => ({
					type: param.type,
					name: getFnParamName,
				}));
				info.name = get(declaration, 'id.name', 'anonymous');
				break;
			default:
				break;
		}
	}
	return info;
}

module.exports = function getExport(ast, filePath) {
	const data = {
		functions: ast.program.body.filter(line => line.type === 'FunctionDeclaration').map(fn => ({ id: fn.id.name, value: fn })),
		classes: ast.program.body.filter(line => line.type === 'ClassDeclaration').map(fn => ({ id: fn.id.name, value: fn })),
		vars: ast.program.body.filter(line => line.type === 'VariableDeclaration').reduce(
			(acc, current) => acc.concat(
				current.declarations.map(declaration => ({ id: declaration.id.name, value: declaration }))
			), []
		),
		imports: ast.program.body.filter(line => line.type === 'ImportDeclaration').reduce(
			(acc, current) => acc.concat(
				current.specifiers.map(specifier => ({ id: specifier.local.name, value: specifier }))
			), []
		),
	};

	const defaultExport = ast.program.body.filter(line => line.type === 'ExportDefaultDeclaration');
	const namedExport = ast.program.body.filter(line => line.type === 'ExportNamedDeclaration');
	const allExports = namedExport.map(exp => ({
		default: false,
		...getExportInfo(exp, data, filePath),
	}));
	if (defaultExport.length === 1) {
		allExports.push({
			default: true,
			...getExportInfo(defaultExport[0], data, filePath),
		});
	}
	return allExports;
};
