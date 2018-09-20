import { call } from 'redux-saga/lib/effects';
import { loadResource } from './resource';

function* initAnalytics() {
	yield call(loadResource, {
		url: '/api/analytics',
		id: 'analytics',
	});
}

// eslint-disable-next-line import/prefer-default-export
export function* handleAnalytics() {
	yield call(initAnalytics);
}
