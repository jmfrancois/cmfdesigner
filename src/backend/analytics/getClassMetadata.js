const get = require('lodash/get');
const getFunctionMetadata = require('./getFunctionMetadata');

module.exports = function getClassMetadata(ast, classAST) {
	const name = classAST.id.name;
	const metadata = getFunctionMetadata(ast, name);
	// get static
	const statics = classAST.body.body
		.filter(item => item.type === 'ClassProperty')
		.filter(item => item.static);
	statics.forEach(s => {
		const key = get(s, 'key.name');
		if (key === 'propTypes') {
			metadata.propTypes = true;
		} else if (key && s.value) {
			// this case include displayName
			metadata[key] = get(s, 'value.value', s.value.type);
		}
	});
	return metadata;
};
