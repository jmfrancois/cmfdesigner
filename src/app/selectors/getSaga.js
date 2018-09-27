import components from '../components';

const cache = {};

export default function getSaga(state) {
	const id = components.SelectionList.getState(state, 'sagas').get('active');
	const items = state.cmf.collections.getIn(['sagas']);
	if (id && cache.key === id && cache.value) {
		return cache.value;
	} else if (id) {
		const saga = items.find(item => item.get('id') === id);
		if (saga) {
			cache.key = id;
			cache.value = saga.toJS();
			return cache.value;
		}
	}
	return {};
}
