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
		</div>
	);
}

ViewComponent.propTypes = {
	...cmfConnect.propTypes,
};
ViewComponent.ACTION_TYPE_DELETE_BTN = 'VIEW_COMPONENT_DELETE_BTN_CLICKED';

export default cmfConnect({})(ViewComponent);
