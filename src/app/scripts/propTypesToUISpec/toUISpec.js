const propTypes = require('./propTypes');

module.exports = function toUISpec(ast) {
    const propTypeVarName = propTypes.getReactPropTypesVarName(ast);
    const propTypesExpression = propTypes.getPropTypesAssigments(ast, propTypeVarName);
    // const uiSpec = astToUISpec(propTypesExpression, propTypeVarName);
	return Object.keys(propTypesExpression).reduce((acc, componentName) => {
		acc[componentName] = propTypesExpression[componentName].properties.reduce((buff, property) => {
			if (property.type === 'ObjectProperty') {
				const key = property.key.name;
				const type = propTypes.getJSONSchemaType(property, propTypeVarName);
				if (type) {
					buff.jsonSchema.properties[key] = { type };
					buff.uiSchema.push({ key });
				}
			}
			return buff;
		}, {
			jsonSchema: {
				type: 'object',
				properties: {},
				required: [],
			},
			uiSchema: [],
			properties: {},
		});
		return acc;
	}, {});
}
