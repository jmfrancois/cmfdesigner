const getPropTypes = require('./propTypes');

module.exports = function getFunctionMetadata(ast, name) {
	const metadata = {};
	const assigments = ast.program.body.filter(line => line.type === 'ExpressionStatement')
		.filter(line => line.expression.type === 'AssignmentExpression')
		.filter(line => line.expression.left.object.name === name);
	assigments.forEach(assigment => {
		if (assigment.expression.left.property.name === 'propTypes') {
			metadata.hasPropTypes = true;
			metadata.propTypes = getPropTypes(assigment.expression.right);
		} else if (assigment.expression.right.type === 'StringLiteral') {
			metadata[assigment.expression.left.property.name] = assigment.expression.right.value;
		}
	});
	return metadata;
};
