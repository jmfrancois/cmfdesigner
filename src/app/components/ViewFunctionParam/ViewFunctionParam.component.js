import React from 'react';
import PropTypes from 'prop-types';

function renderProperties(properties) {
	return properties.map(prop => prop.name).join(', ');
}

function ViewFunctionParam(props) {
	if (!props.params) {
		return 'no params';
	}
	const params = props.params.reduce((acc, param) => {
		if (param.type === 'ObjectPattern') {
			acc.push(`{ ${renderProperties(param.properties)} }`);
		}
		if (param.name && param.value) {
			acc.push(`${param.name} = ${param.value}`);
		}
		if (param.type === 'Identifier') {
			acc.push(`${param.name}`);
		}
		if (param.type === 'AssignmentPattern') {
			let defaultValue = '';
			if (param.defaultValue.type === 'ObjectExpression') {
				defaultValue = `{${param.defaultValue.length}}`;
			} else if (param.defaultValue.type === 'Literal') {
				defaultValue = `'${defaultValue.value}'`;
			} else if (param.defaultValue.type === 'ArrayExpression') {
				defaultValue = `[${defaultValue.length}]`;
			} else if (param.defaultValue.value) {
				defaultValue = param.defaultValue.value;
			}
			acc.push(`${param.name} = ${defaultValue},`);
		}
		if (param.type === 'RestElement') {
			acc.push(`...${param.name}`);
		}
		return acc;
	}, []);
	return <span>({params.join(', ')})</span>;
}

ViewFunctionParam.propTypes = {
	params: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.string.isRequired,
		name: PropTypes.string,
		value: PropTypes.any,
		defaultValue: PropTypes.shape({
			type: PropTypes.string.isRequired,
			length: PropTypes.number,
			value: PropTypes.any,
		}),
	})),
};
ViewFunctionParam.displayName = 'ViewFunctionParam';
export default ViewFunctionParam;
