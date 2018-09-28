
import Immutable from 'immutable';

export default function isWebapp({ context }) {
	const state = context.store.getState();
	const components = state.cmf.collections.getIn(['components'], new Immutable.Map());
	return components.size > 0;
}
