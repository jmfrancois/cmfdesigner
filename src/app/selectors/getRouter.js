import { Map } from 'immutable';

const DEFAULT_ROUTER = new Map();
const cache = {};

export default function getRouter(state) {
	const router = state.cmf.collections.getIn(['settings', 'data', 'routes'], DEFAULT_ROUTER);
	if (caches.key === router) {
		return caches.value;
	}
	cache.key = router;
	cache.value = router.toJS();
	return cache.value;
}
