import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';

function renderValue(value) {
	if (Array.isArray(value)) {
		if (value.length === 0) {
			return '[]';
		}
		return (
			<ul>
				{value.map((v, i) => <li key={i}>{i}: {renderValue(v)}</li>)}
			</ul>
		);
	} if (typeof value === 'object') {
		return (
			<ul>
				{Object.keys(value).map((v, i) => <li key={i}>{v}: {renderValue(value[v])}</li>)}
			</ul>
		);
	} if (typeof value === 'string') {
		return value;
	} if (typeof value === 'boolean') {
		return value ? 'true' : 'false';
	}
	return value;
}


function ViewProps(props) {
	if (!props.item) {
		return null;
	}
	const item = props.item.toJS();
	if (item.value === undefined) {
		return null;
	}
	const metadata = item.name.split('#');
	return (
		<div>
			{/* <button
				className="btn btn-danger pull-right"
				onClick={() => props.dispatch({
					type: ViewProps.ACTION_TYPE_DELETE,
					id: item.get('id'),
				})}
			>
				Delete
			</button> */}
			<h1>{item.name}</h1>
			{metadata.length !== 2 && (
				<div className="alert alert-warning">
					<p>You should use the following syntax in the props id:</p>
					<pre>ComponentName#componentId</pre>
				</div>
			)}
			<ul>
				{Object.keys(item.value).map((key, index) => (
					<li key={index}>{key}: {renderValue(item.value[key])}</li>
				))}
			</ul>
		</div>
	);
}

ViewProps.propTypes = {
	name: PropTypes.string,
	...cmfConnect.propTypes,
};
ViewProps.displayName = 'ViewProps';

export default cmfConnect({})(ViewProps);
