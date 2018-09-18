import components from '../components';

const cache = {};

export default function getProps({ context }) {
	const state = context.store.getState();
	const id = components.SelectionList.getState(state, 'props').get('active');
	const props = state.cmf.collections.getIn(['props', 'data']);
	if (id) {
		if (!cache[id]) {
			const found = props.find(item => item.get('id') === id);
			if (found) {
				cache[id] = found.toJS();
			}
		}
		return cache[id];
	}
	return undefined;
}
