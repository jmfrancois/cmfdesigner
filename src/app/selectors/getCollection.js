const cache = {};

export default function getCollection(state, id) {
	const expressions = state.cmf.collections.get(id);
	if (cache.key !== expressions) {
		cache.key = expressions;
		delete cache.value;
		if (expressions) {
			cache.value = expressions.toJS();
		}
	}
	return cache.value;
}
