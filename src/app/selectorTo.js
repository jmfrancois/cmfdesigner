import { select } from 'redux-saga/effects';
// This should be proposed in the CMF API

function toExpression(selector) {
	function selectorAsExpression({ context }, ...args) {
		return selector(context.store.getState(), ...args);
	}
	if (name) {
		Object.defineProperty(selectorAsExpression, 'name', { value: name });
	}
	return selectorAsExpression;
}

function toSaga(selector, name) {
	function* selectorAsSaga(...args) {
		const state = yield select();
		return selector(state, ...args);
	}
	if (name) {
		Object.defineProperty(selectorAsSaga, 'name', { value: name });
	}
	return selectorAsSaga;
}

export default {
	toExpression,
	toSaga,
};
