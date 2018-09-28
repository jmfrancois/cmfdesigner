import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, Inject } from '@talend/react-cmf';


function ViewProps(props) {
	if (!props.item) {
		return null;
	}
	if (props.item.value === undefined) {
		return null;
	}
	const metadata = props.item.name.split('#');
	return (
		<div>
			<h1>{props.item.name}</h1>
			{metadata.length !== 2 && (
				<div className="alert alert-warning">
					<p>You should use the following syntax in the props id:</p>
					<pre>ComponentName#componentId</pre>
				</div>
			)}
			<Inject component="ObjectViewer" componentId="view-props" id="view-props" data={props.item.value} />
			<Inject component="FileAnalytics" path={props.item.path} />
		</div>
	);
}

ViewProps.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string,
		value: PropTypes.object,
		filename: PropTypes.string,
		path: PropTypes.string,
	}),
	...cmfConnect.propTypes,
};
ViewProps.displayName = 'ViewProps';
ViewProps.ACTION_TYPE_CLICK_OPEN = 'USER_CLICK_OPEN_PROPS';
export default cmfConnect({})(ViewProps);
