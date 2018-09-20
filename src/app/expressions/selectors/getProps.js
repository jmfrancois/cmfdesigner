export default function getProps({ context }) {
	const state = context.store.getState();
	return state.cmf.collections.getIn(['props', 'data'], []);
}
