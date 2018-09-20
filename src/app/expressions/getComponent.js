import selectors from '../selectors';

export default function getComponent({ context }) {
	const state = context.store.getState();
	return selectors.getComponent(state);
}
