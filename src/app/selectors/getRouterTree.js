import services from '../experimental-cmf/services';

const cache = {};

function getInfo(route) {
	return {
		children: (route.childRoutes || []).map(getInfo),
		name: `${route.path} -> ${route.component}#${route.componentId || route.view || 'default'}`,
		id: `${route.component}#${route.componentId || 'default'}:${route.path}`,
		route,
	};
}

const DEFAULT_ROUTER_TREE = [];

export default function getRouterTree(state) {
	const routes = services.get('designer.routes').inSelector();
	const router = routes.getAll(state);
	if (caches.key === router) {
		return caches.value;
	}
	if (router.length === 0) {
		return DEFAULT_ROUTER_TREE;
	}
	cache.key = router;
	cache.value = router.map(r => getInfo(r.value));
	return cache.value;
}
