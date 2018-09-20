const get = require('lodash/get');

function getFunctionMetdata(ast, id) {
	const metadata = {};
	const assigments = ast.program.body.filter(line => line.type === 'ExpressionStatement')
		.filter(line => line.expression.type === 'AssignmentExpression')
		.filter(line => line.expression.left.object.name === id);
	assigments.forEach(assigment => {
		if (assigment.expression.left.property.name === 'propTypes') {
			metadata.propTypes = true;  // TODO: add more info on propTypes
		} else if (assigment.expression.right.type === 'Literal') {
			// this case include displayName
			metadata[assigment.expression.left.property.name] = assigment.expression.right.value;
		}
	});
	return metadata;
}

function getClassMetdata(ast, classAST) {
	const name = classAST.id.name;
	const metadata = getFunctionMetdata(ast, name);
	// get static
	const statics = classAST.body.body
		.filter(item => item.type === 'ClassProperty')
		.filter(item => item.static);
	statics.forEach(s => {
		if (get(s, 'key.name') === 'propTypes') {
			metadata.propTypes = true;
		} else if (s.value.type === 'Literal') {
			// this case include displayName
			metadata[s.key.name] = s.value.value;
		}
	});
	return metadata;
}

function findClasses(ast) {
	const components = [];
	const classes = ast.program.body
		.filter(line => line.type === 'ClassDeclaration')
		.filter(line => (
			get(line, 'superClass.object.name') === 'React' &&
			get(line, 'superClass.property.name') === 'Component'
		));
	classes.forEach(cl => {
		const metadata = getClassMetdata(ast, cl);
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
		const metadata = getFunctionMetdata(ast, fn.id.name);
		if (
			(fn.params.length === 1 && fn.params[0].name === 'props') ||
			(metadata.displayName || metadata.propTypes)
		) {
			components.push({
				type: 'function',
				name: fn.id.name,
				...metadata,
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

module.exports = function getComponents(ast) {
	const classes = findClasses(ast);
	const functions = findFunction(ast);
	const arrows = findArrow(ast);
	if (functions.length) {
		// console.log(classes.concat(functions).concat(arrows));
	}
	return classes.concat(functions).concat(arrows);
};
