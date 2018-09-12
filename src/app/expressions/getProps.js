import Immutable from 'immutable';
import components from '../components';

export function getProps({ context }) {
	const state = context.store.getState();
	const id = components.SelectionList.getState(state, 'props').get('active');
	const props = state.cmf.collections.getIn(['props', 'data']);
	if (id) {
		return props.find(item => item.get('id') === id);
	}
	return new Immutable.Map();
}
