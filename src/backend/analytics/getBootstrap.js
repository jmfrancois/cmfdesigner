
/**
 * import * as name from './file'
 * import name from './file';
 * import { name } from './file';
 */
function findInImport(ast, name) {
	const imports = ast.program.body.filter(line => line.type === 'ImportDeclaration');
	if (imports.length) {
		return imports.reduce((acc, imp) => {
			const specifier = imp.specifiers.find(spec => spec.local.name === name);
			if (specifier) {
				return {
					import: true,
					importType: specifier.type,
					path: imp.source.value,
					name,
				};
			}
			return acc;
		});
	}
	return undefined;
}

function find(ast, name) {
	return findInImport(ast, name);
}

/**
 * support the following patterns
 * @example
	"""
	import expressions from './expressions';
	"""
	return [{ import: true, default: true, path: './expressions', name: 'expressions' }]
 * @example
	"""
	import * as expressions from './expressions';
	"""
	return [{ import: true, path: './expressions' }]
 *
 * @return {Array} expressions
 */
function getExpressions(ast, config) {
	const expressions = config.properties.filter(property => property.type === 'ObjectProperty')
	.find(property => property.key.name === 'expressions');
	if (expressions) {
		if (expressions.shorthand) {
			// written just `expressions,` in the config object
			return find(ast, 'expressions');
		} else if (expressions.value.type === 'Identifier') {
			// written `expressions: foo`
			return find(ast, expressions.value.name);
		} else if (expressions.value.type === 'ObjectExpression') {
			// eslint-disable-next-line no-console
			console.log('not yet supported');
		}
	}
	return undefined;
}

function getBootstrap(ast, filePath) {
	const cmfImport = ast.program.body.filter(line => line.type === 'ImportDeclaration')
	.filter(imp => imp.source.value === '@talend/react-cmf');
	let cmfName;
	const log = (...args) => {
		if (filePath === 'src/app/index.js') {
			// eslint-disable-next-line no-console
			console.log(...args);
		}
	};
	if (cmfImport.length === 1) {
		cmfImport[0].specifiers.forEach(specifier => {
			if (specifier.type === 'ImportDefaultSpecifier') {
				log('found', specifier.local.name);
				cmfName = specifier.local.name;
			}
		});
	}
	if (cmfName) {
		const statements = ast.program.body.filter(line => line.type === 'ExpressionStatement')
			.filter(expr => expr.expression.type === 'CallExpression')
			.filter(expr => expr.expression.callee.type === 'MemberExpression')
			.filter(expr => expr.expression.callee.object.name === cmfName)
			.filter(expr => expr.expression.callee.property.name === 'bootstrap');
		if (statements.length === 1) {
			const config = statements[0].expression.arguments[0];
			if (config) {
				return {
					expressions: getExpressions(ast, config),
					// TODO: add other items, like components, ...
				};
			}
		}
	}
	return {};
}
module.exports = getBootstrap;
