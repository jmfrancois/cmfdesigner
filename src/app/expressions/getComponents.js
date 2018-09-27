import selectors from '../selectors';

export default function getComponents({ context }) {
	const state = context.store.getState();
	return selectors.getComponents(state);
}
