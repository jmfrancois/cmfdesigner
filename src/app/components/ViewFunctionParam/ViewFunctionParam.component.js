import React from 'react';
import PropTypes from 'prop-types';

function renderProperties(properties) {
	return properties.map(prop => {
		const buffer = '';
		if (prop.name && prop.shorthand) {
			return prop.name;
		}
		return buffer;
	});
}

function ViewFunctionParam(props) {
	if (!props.params) {
		return 'no params';
	}
	return (
		<span>(
			{props.params.map(param => {
				if (param.type === 'ObjectPattern') {
					return `{ ${renderProperties(param.properties)} }, `;
				}
				if (param.name && param.value) {
					return `${param.name} = ${param.value}, `;
				}
				if (param.type === 'Identifier') {
					return `${param.name}, `;
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
					return `${param.name} = ${defaultValue},`;
				}
				if (param.type === 'RestElement') {
					return `...${param.name}`;
				}
				return null;
			})}
		)</span>
	);
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
