import React from 'react';
import { cmfConnect } from '@talend/react-cmf';

function ViewComponent(props) {
	return (
		<div>
			<h1>{props.item.get('name')}</h1>
			<p>TODO: you will see results of some analytics here</p>
			<div className="btn-group">
				<button
					className="btn btn-danger"
					onClick={() => props.dispatch({
						type: ViewComponent.ACTION_TYPE_DELETE_BTN,
						id: props.item.get('id')
					})}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

ViewComponent.propTypes = {
	...cmfConnect.propTypes,
};
ViewComponent.ACTION_TYPE_DELETE_BTN = 'VIEW_COMPONENT_DELETE_BTN_CLICKED';

export default cmfConnect({})(ViewComponent);
