import React from 'react';
import { cmfConnect } from '@talend/react-cmf';

function ViewComponent(props) {
	return (
		<div>
			<button
				className="btn btn-danger pull-right"
				onClick={() => props.dispatch({
					type: ViewComponent.ACTION_TYPE_DELETE_BTN,
					id: props.item.get('id'),
				})}
			>
				Delete
			</button>
			<h1>{props.item.get('name')}</h1>
			<ul>
				<li>If used in router display routes where it s used</li>
				<li>Link to existing settings</li>
				<li>Link to other components that use it (global analysis)</li>
				<li>Browse the code (cheap but nice for review project)</li>
				<li>lint</li>
				<li>dependencies used inside it</li>
				<li>display tips or technics associated to this kind of components</li>
			</ul>
		</div>
	);
}

ViewComponent.propTypes = {
	...cmfConnect.propTypes,
};
ViewComponent.ACTION_TYPE_DELETE_BTN = 'VIEW_COMPONENT_DELETE_BTN_CLICKED';

export default cmfConnect({})(ViewComponent);
