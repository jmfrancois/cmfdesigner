import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';

function renderPropType(key, obj) {
	return (
		<tr key={key}>
			<td>{key}</td>
			<td>{obj[key].type}</td>
			<td>{obj[key].required ? 'true' : 'false'}</td>
		</tr>
	);
}

function ViewPropTypes(props) {
	if (!props.data) {
		return null;
	}
	const keys = Object.keys(props.data);
	if (keys.length === 0) {
		return null;
	}
	return (
		<table className="table table-bordered">
			<thead>
				<tr>
					<th>Props</th>
					<th>Type</th>
					<th>isRequired</th>
				</tr>
			</thead>
			<tbody>
				{keys.map(key => renderPropType(key, props.data))}
			</tbody>
		</table>
	);
}

ViewPropTypes.displayName = 'ViewPropTypes';
ViewPropTypes.propTypes = {
	data: PropTypes.object,
};

export default cmfConnect({})(ViewPropTypes);
