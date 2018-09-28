import selectors from '../selectors';

export default function getSaga({ context }) {
	const state = context.store.getState();
	return selectors.getSaga(state);
}
