
const cache = {};

export default function getAnalytics(state) {
	const analytics = state.cmf.collections.get('analytics');
	if (cache.key === analytics && cache.value) {
		return cache.value;
	}
	cache.key = analytics;
	cache.value = analytics.toJS();
	return cache.value;
}
