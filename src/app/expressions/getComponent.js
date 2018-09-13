import Immutable from 'immutable';
import components from '../components';

export function getComponent({ context }) {
	const state = context.store.getState();
	const id = components.SelectionList.getState(state, 'components').get('active');
	const props = state.cmf.collections.getIn(['components', 'components']);
	if (id) {
		return props.find(item => item.get('id') === id);
	}
	return new Immutable.Map();
}
