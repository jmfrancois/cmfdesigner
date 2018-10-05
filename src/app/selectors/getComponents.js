import { List } from 'immutable';


const cache = {};
const DEFAULT_ANALYTICS = new List();

function reduceComponents(acc, item) {
	const components = item.get('components', new List());
	if (components.size) {
		return components.reduce(
			(subacc, component) => subacc.push(
				component.set('path', item.get('path'))
				.set('id', component.get('name'))
			), acc);
	}
	return acc;
}

export default function getComponents(state) {
	const analytics = state.cmf.collections.get('analytics', DEFAULT_ANALYTICS);
	if (cache.key === analytics) {
		return cache.value;
	}
	cache.key = analytics;
	cache.value = analytics.reduce(reduceComponents, new List());
	return cache.value;
}

// todo: rewrite this.
