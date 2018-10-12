const get = require('lodash/get');
const path = require('path');

function getIsLocal(info) {
	return info.source.startsWith('.');
}

function getPath(info, filePath) {
	if (info.isLocal) {
		return path.resolve(filePath, '..', `${info.source}.js`);
	}
	return undefined;
}

function reduceSpecifiersInfo(acc, ast, filePath) {
	return acc.concat(ast.specifiers.map(spec => {
		const info = {
			source: get(ast, 'source.value'),
			default: spec.type === 'ImportDefaultSpecifier',
			name: get(spec, 'local.name'),
		};
		info.isLocal = getIsLocal(info);
		info.path = getPath(info, filePath);
		return info;
	}));
}

/**
 * add support for the followin syntax:
 * export * from './ack';
 */
function reduceExportAll(acc, ast, filePath) {
	const info = {
		source: get(ast, 'source.value'),
		default: false,
		name: '*',
	};
	info.isLocal = getIsLocal(info);
	info.path = getPath(info, filePath);
	return acc.concat([info]);
}

/**
 * @param {Object} ast recast ast
 * @return {Object}
 * @example
	{
		dependencies: [
			{ source: 'react', default: true, name: 'React' },
			{ source: 'cmfConnect', default: false, name: '@talend/react-cmf' },
		]
	}
 *
 */
function getDependencies(ast, filePath) {
	const dependencies = ast.program.body
		.filter(line => line.type === 'ImportDeclaration')
		.reduce((acc, current) => reduceSpecifiersInfo(acc, current, filePath), []);
	// find `export * as foo from './toto'` and export}
	const exportFrom = ast.program.body
		.filter(line => line.type === 'ExportNamedDeclaration' && line.source !== null)
		.reduce((acc, current) => reduceSpecifiersInfo(acc, current, filePath), []);
	const exportAllFrom = ast.program.body
		.filter(line => line.type === 'ExportAllDeclaration' && line.source !== null)
		.reduce((acc, current) => reduceExportAll(acc, current, filePath), []);
	return {
		dependencies: dependencies.concat(exportFrom).concat(exportAllFrom),
	};
}

module.exports = getDependencies;
