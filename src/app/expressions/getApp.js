import Immutable from 'immutable';

export default function getApp({ context }) {
	const state = context.store.getState();
	return state.cmf.collections.get('apps', new Immutable.Map());
}
