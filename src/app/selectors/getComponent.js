import components from '../components';

const cache = {};

export default function getComponent(state) {
	const id = components.SelectionList.getState(state, 'components').get('active');
	const props = state.cmf.collections.getIn(['components']);
	if (id && cache.key === id && cache.value) {
		return cache.value;
	} else if (id) {
		const component = props.find(item => item.get('id') === id);
		if (component) {
			cache.key = id;
			cache.value = component.toJS();
			return cache.value;
		}
	}
	return {};
}
