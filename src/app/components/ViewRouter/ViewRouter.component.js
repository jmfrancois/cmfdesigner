import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, Inject } from '@talend/react-cmf';
import { Map } from 'immutable';
import theme from './theme.scss';
import { ROUTER_TREE_OPEN_COMPONENT, ROUTER_TREE_OPEN_PROPS } from '../../constants';

function addActions(route, dispatch) {
	const actions = [
		{
			label: 'Open Component',
			icon: 'talend-link',
			action() {
				dispatch({
					type: ROUTER_TREE_OPEN_COMPONENT,
					component: route.route.component,
				});
			},
		},
	];
	if (route.componentId) {
		actions.push({
			label: 'Open Props',
			icon: 'talend-cog',
			action() {
				dispatch({
					type: ROUTER_TREE_OPEN_PROPS,
					component: route.route.component,
					componentId: route.route.componentId,
				});
			},
		});
	}
	if (route.route.view) {
		actions.push({
			label: 'Open Props',
			icon: 'talend-cog',
			action() {
				dispatch({
					type: ROUTER_TREE_OPEN_PROPS,
					view: route.route.view,
				});
			},
		});
	}
	let children;
	if (route.children) {
		children = route.children.map(childRoute => addActions(childRoute, dispatch));
	}
	return Object.assign({}, route, { actions, children });
}

function ViewRouter(props) {
	if (!props.router) {
		return null;
	}
	const router = props.router.map(route => addActions(route, props.dispatch));
	return (
		<div>
			<h1>react-router v3 configuration</h1>
			<Inject
				className={theme.column}
				component="TreeView"
				componentId="router"
				structure={router}
				id="router-tree"
				headerText="Configuration"
				onSelect={(event, obj) => {
					props.setState({
						active: obj,
						clientX: event.clientX,
						clientY: event.clientY,
					});
				}}
			/>
		</div>
	);
}

ViewRouter.displayName = 'ViewRouter';
ViewRouter.propTypes = {
	router: PropTypes.object,
	...cmfConnect.propTypes,
};

export default cmfConnect({
	defaultState: new Map(),
	defaultProps: {
		routerExpression: 'getRouterTree',
	},
})(ViewRouter);
