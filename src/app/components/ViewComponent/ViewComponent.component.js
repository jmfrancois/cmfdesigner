import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';

function ViewComponent(props) {
	return (
		<ul>
			<li>Type: {props.component.type}</li>
			{props.component.propTypes && <li>has PropTypes</li>}
			{props.component.displayName && <li>displayName: {props.component.displayName}</li>}
		</ul>
	);
}

ViewComponent.propTypes = {
	component: PropTypes.shape({
		type: PropTypes.string.isRequired,
		propTypes: PropTypes.bool,
		displayName: PropTypes.string,
	}),
	...cmfConnect.propTypes,
};
ViewComponent.ACTION_TYPE_DELETE_BTN = 'VIEW_COMPONENT_DELETE_BTN_CLICKED';
ViewComponent.displayName = 'ViewComponent';
ViewComponent.defaultProps = {
	component: {},
};
export default cmfConnect({
	defaultProps: {
		componentExpression: 'service#designer.components:getCurrent',
	},
})(ViewComponent);
