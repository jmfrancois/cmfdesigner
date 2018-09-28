import selectors from '../selectors';

export default function getExpression({ context }) {
	const state = context.store.getState();
	return selectors.getExpression(state);
}
