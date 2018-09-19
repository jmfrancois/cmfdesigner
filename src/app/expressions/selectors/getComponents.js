import Immutable from 'immutable';

export default function getComponents({ context }) {
	const state = context.store.getState();
	return state.cmf.collections.getIn(['components', 'data'], new Immutable.Map());
}
