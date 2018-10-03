const get = require('lodash/get');
const getFunctionMetadata = require('./getFunctionMetadata');

function isFunctionComponent(fn, ast) {
	const name = get(fn, 'id.name');
	if (!name) {
		return false;
	}
	if (name[0].toUpperCase() !== name[0]) {
		return false;
	}
	const metadata = getFunctionMetadata(ast, name);
	return (
		(fn.params.length === 1 && fn.params[0].name === 'props') ||
		(metadata.displayName || metadata.propTypes)
	);
}

function isClassComponent(classAST) {
	return (
		get(classAST, 'superClass.object.name') === 'React' &&
		get(classAST, 'superClass.property.name') === 'Component'
	);
}

module.exports = function isComponent(declaration, ast) {
	if (!declaration) {
		return false;
	}
	if (declaration.type === 'FunctionDeclaration' && declaration.params) {
		return isFunctionComponent(declaration, ast);
	}
	if (declaration.type === 'ClassDeclaration' && declaration.superClass) {
		return isClassComponent(declaration, ast);
	}
	return false;
};
