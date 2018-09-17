import Immutable from 'immutable';

export default function getCWD({ context }) {
	const state = context.store.getState();
	return state.cmf.collections.getIn(['apps', 'path'], new Immutable.Map());
}