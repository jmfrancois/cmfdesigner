import components from '../components';

const cache = {};

export default function getComponent({ context }) {
	const state = context.store.getState();
	const id = components.SelectionList.getState(state, 'components').get('active');
	const props = state.cmf.collections.getIn(['components', 'components']);
	if (id) {
		if (!cache[id]) {
			const component = props.find(item => item.get('id') === id);
			if (component) {
				cache[id] = component.toJS();
			}
		}
		return cache[id];
	}
	return {};
}
