const getClassMetadata = require('./getClassMetadata');
const getFunctionMetadata = require('./getFunctionMetadata');
const isComponent = require('./isComponent');

function findClasses(ast) {
	const components = [];
	const classes = ast.program.body
		.filter(line => line.type === 'ClassDeclaration')
		.filter(isComponent);
	classes.forEach(cl => {
		const metadata = getClassMetadata(ast, cl);
		components.push({
			type: 'class',
			name: cl.id.name,
			...metadata,
		});
	});
	return components;
}

function findFunction(ast) {
	const components = [];
	const functions = ast.program.body.filter(line => line.type === 'FunctionDeclaration');
	functions.forEach(fn => {
		if (isComponent(fn, ast)) {
			components.push({
				type: 'function',
				name: fn.id.name,
				...getFunctionMetadata(ast, fn.id.name),
			});
		}
	});
	return components;
}

function findArrow() {
	const components = [];
	// const vars = ast.program.body.filter(line => line.type === 'FunctionDeclaration');
	return components;
}


/**
 * Find internal components in the root of the file
 */
function getComponents(ast) {
	const classes = findClasses(ast);
	const functions = findFunction(ast);
	const arrows = findArrow(ast);
	return classes.concat(functions).concat(arrows);
}

module.exports = getComponents;
