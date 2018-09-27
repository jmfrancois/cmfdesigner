import { List } from 'immutable';

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
	return state.cmf.collections.get('analytics', new List()).reduce(reduceComponents, new List());
}
