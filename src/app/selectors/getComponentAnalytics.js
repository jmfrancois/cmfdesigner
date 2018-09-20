import getAnalytics from './getAnalytics';
import getComponent from './getComponent';

const cache = {};

export default function getComponentAnalytics(state) {
	const component = getComponent(state);
	if (!component) {
		return {};
	}
	if (cache.key === component.name && cache.value) {
		return cache.value;
	}
	const analytics = getAnalytics(state);
	cache.key = component.name;
	cache.value = analytics.filter(file => {
		const components = file.components.filter(c => c.name === component.name);
		return components.length || file.path.indexOf(component.name) !== -1;
	});
	return cache.value;
}
