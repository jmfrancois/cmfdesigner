import selectors from '../selectors';

export default function getComponentFiles({ context }) {
	const state = context.store.getState();
	return selectors.getComponentAnalytics(state);
}
