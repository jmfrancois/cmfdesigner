import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, Inject } from '@talend/react-cmf';
import { Map, List } from 'immutable';
import theme from './theme.scss';
import { ROUTER_TREE_OPEN_COMPONENT, ROUTER_TREE_OPEN_PROPS } from '../../constants';

function addActions(route, props) {
	const actions = [];
	if (props.components.find(cmp => cmp.name === route.route.component)) {
		actions.push(
			{
				label: 'Open Component',
				icon: 'talend-link',
				tooltipPlacement: 'top',
				action() {
					props.dispatch({
						type: ROUTER_TREE_OPEN_COMPONENT,
						component: route.route.component,
					});
				},
			}
		);
	}
	const propId = `${route.route.component}#${route.route.componentId || 'default'}`;
	if (props.props.find(prop => prop.name === propId)) {
		actions.push({
			label: 'Open Props',
			icon: 'talend-cog',
			tooltipPlacement: 'top',
			action() {
				props.dispatch({
					type: ROUTER_TREE_OPEN_PROPS,
					propsId: `${route.route.component}#${route.route.componentId || 'default'}`,
				});
			},
		});
	}
	if (route.route.view) {
		if (props.props.find(prop => prop.name === route.route.view)) {
			actions.push({
				label: 'Open Props',
				icon: 'talend-cog',
				tooltipPlacement: 'top',
				action() {
					props.dispatch({
						type: ROUTER_TREE_OPEN_PROPS,
						propsId: route.route.view,
					});
				},
			});
		} else {
			actions.push({
				label: 'View not found',
				icon: 'talend-warning',
				tooltipPlacement: 'top',
			});
		}
	}
	let children;
	if (route.children) {
		children = route.children.map(childRoute => addActions(childRoute, props));
	}
	return Object.assign({}, route, { actions, children });
}

function reduceRouteToComponents(acc, route) {
	if (route.component && acc.indexOf(route.component) === -1) {
		acc.push(route.component);
	}
	if (route.indexRoute) {
		reduceRouteToComponents(acc, route.indexRoute);
	}
	if (route.childRoutes) {
		route.childRoutes.reduce(reduceRouteToComponents, acc);
	}
	return acc;
}

function ViewRouter(props) {
	if (!props.router) {
		return null;
	}
	const router = props.router.map(route => addActions(route, props));
	const components = [props.router[0].route].reduce(reduceRouteToComponents, []);
	const data = new List(router);
	return (
		<div>
			<h1>react-router v3 configuration</h1>
			<div className={theme.row}>
				<Inject
					className={theme.column}
					component="TreeView"
					componentId="router"
					data={data}
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
				<div className={theme.column}>
					<h2>Components injected by the router</h2>
					<ul>
						{components.map(component => <li key={component}>{component}</li>)}
					</ul>
				</div>
			</div>
		</div>
	);
}

ViewRouter.displayName = 'ViewRouter';
ViewRouter.propTypes = {
	router: PropTypes.object,
	...cmfConnect.propTypes,
};
ViewRouter.defaultProps = {
	components: [],
	props: [],
};
ViewRouter.ROUTER_TREE_OPEN_COMPONENT = ROUTER_TREE_OPEN_COMPONENT;
ViewRouter.ROUTER_TREE_OPEN_PROPS = ROUTER_TREE_OPEN_PROPS;

export default cmfConnect({
	defaultState: new Map(),
	defaultProps: {
		routerExpression: 'getRouterTree',
		componentsExpression: 'service#designer.components:getAll',
		propsExpression: 'service#designer.props:getAll',
	},
})(ViewRouter);
