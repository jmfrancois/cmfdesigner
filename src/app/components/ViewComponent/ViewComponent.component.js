import React from 'react';
import PropTypes from 'prop-types';
import { Inject, cmfConnect } from '@talend/react-cmf';
import modules from '../../experimental-cmf/modules';

function ViewComponent(props) {
	const api = modules.get('designer.components').inComponent(props);
	return (
		<div>
			<button
				className="btn btn-danger pull-right"
				onClick={event => api.delete(event, { id: props.item.id })}
			>
				Delete
			</button>
			<h1>Component: {props.item.name}</h1>
			<ul>
				<li>Type: {props.item.type}</li>
				{props.item.propTypes && <li>has PropTypes</li>}
				{props.item.displayName && <li>displayName: {props.item.displayName}</li>}
			</ul>
			{!props.item.displayName && (
				<div className="alert alert-danger">
					<p>No DisplayName: In the context of CMF it s a requirement to add
						displayName to your component
					</p>
				</div>
			)}
			{!props.item.propTypes && (
				<div className="alert alert-warning">
					<p>No PropTypes: It's always better to add propTypes</p>
				</div>
			)}
			<Inject component="FileAnalytics" path={props.item.path} />
		</div>
	);
}

ViewComponent.propTypes = {
	item: PropTypes.object,
	...cmfConnect.propTypes,
};
ViewComponent.ACTION_TYPE_DELETE_BTN = 'VIEW_COMPONENT_DELETE_BTN_CLICKED';
ViewComponent.displayName = 'ViewComponent';
ViewComponent.defaultProps = {
	item: {},
};
export default cmfConnect({
	defaultProps: {
		itemExpression: 'getComponent',
	},
})(ViewComponent);
