const get = require('lodash/get');
const path = require('path');

function reduceImportInfo(acc, ast, filePath) {
	return acc.concat(ast.specifiers.map(spec => {
		const info = {
			source: get(ast, 'source.value'),
			default: spec.type === 'ImportDefaultSpecifier',
			name: get(spec, 'local.name'),
		};
		info.isLocal = info.source.startsWith('.');
		if (info.isLocal) {
			info.path = path.resolve(filePath, info.source);
		}
		return info;
	}));
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
	return {
		dependencies: ast.program.body
			.filter(line => line.type === 'ImportDeclaration')
			.reduce((acc, current) => reduceImportInfo(acc, current, filePath), []),
	};
}

module.exports = getDependencies;
