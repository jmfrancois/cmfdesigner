import getRouter from './getRouter';

const cache = {};

function getInfo(route) {
	return {
		children: (route.childRoutes || []).map(getInfo),
		name: `${route.path} -> ${route.component}#${route.componentId || route.view || 'default'}`,
		isOpened: true,
		route,
	};
}

const DEFAULT_ROUTER_TREE = [];

export default function getRouterTree(state) {
	const router = getRouter(state);
	if (caches.key === router) {
		return caches.value;
	}
	if (!router.path) {
		return DEFAULT_ROUTER_TREE;
	}
	cache.key = router;
	cache.value = [getInfo(router)];
	return cache.value;
}