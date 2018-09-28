import components from '../components';

const cache = {};

export default function getComponent(state) {
	const id = components.SelectionList.getState(state, 'expressions').get('active');
	const items = state.cmf.collections.getIn(['expressions']);
	if (id && cache.key === id && cache.value) {
		return cache.value;
	} else if (id) {
		const expression = items.find(item => item.get('id') === id);
		if (expression) {
			cache.key = id;
			cache.value = expression.toJS();
			return cache.value;
		}
	}
	return {};
}
