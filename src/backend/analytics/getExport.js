const get = require('lodash/get');
const getFunctionParams = require('./getFunctionParams');

function isIn(items, id) {
	return items.find(item => item.id === id) !== undefined;
}

function getFunctionInfo(items, id) {
	const fn = items.find(item => item.id === id);
	if (fn && fn.value) {
		return {
			generator: fn.value.generator,
			async: fn.value.async,
			params: getFunctionParams(fn.value),
		};
	}
	return {};
}

function getExportDeclarationInfo(declaration, data, filePath) {
	const info = {};
	info.name = declaration.name || 'undefined';
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
			info.params = getFunctionParams(declaration);
			info.name = get(declaration, 'id.name', 'anonymous');
			break;
		case 'VariableDeclaration':
			info.type = declaration.kind;
			info.declarations = declaration.declarations.map(decl => ({
				name: get(decl, 'id.name'),
				value: get(decl, 'init.value', 'unknown'),
			}));
			info.name = get(declaration, 'declarations[0].id.name', 'unknown');
			info.value = get(declaration, 'declarations[0].init.value', 'unknown');
			break;
		case 'ObjectExpression':
			info.type = 'object';
			info.properties = declaration.properties.reduce((acc, current) => {
				if (current.key && current.value) {
					const key = current.key.name || current.key.value;
					// eslint-disable-next-line no-param-reassign
					acc[key] = {
						key,
						...getExportDeclarationInfo(current.value, data, filePath),
					};
				// } else if (current.key{
				// 	// TODO : add support for ObjectMethod
				// 	console.log('not processed', filePath, current);
				} else {
					// TODO : add support for ObjectMethod
					console.log('not processed', filePath, current);
				}
				return acc;
			}, {});
			break;
		default:
			break;
	}
	return info;
}

function getExportInfo(exportAST, data, filePath) {
	const info = {};
	if (exportAST.declaration) {
		return getExportDeclarationInfo(exportAST.declaration, data, filePath);
	} else if (exportAST.type === 'ExportNamedDeclaration') {
		console.log(`no declaratation`, filePath);
		if (exportAST.source) {
			// export { default as getApp } from './getApp';
			info.path = exportAST.source.value;
		} else {
			// export { foo, var };
			info.path = filePath;
		}
		if (exportAST.specifiers) {
			info.specifiers = exportAST.specifiers.map(spec =>
				getExportDeclarationInfo(spec.exported, data, filePath)
			);
		}
	} else {
		console.error('strange export found:', filePath, exportAST);
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
