import cmf from '@talend/react-cmf';
import { fork, call, takeEvery } from 'redux-saga/effects';
import { handleApps } from './handleApps';
import { handleProps } from './handleProps';
import { handleComponents } from './handleComponents';
import { handleExpressions } from './handleExpressions';
import { handleAnalytics } from './handleAnalytics';
import { handleSagas } from './handleSagas';
import components from '../components';
import refresh from './refresh';

function* onOpen(action) {
	yield call(cmf.sagas.http.post, '/api/open', { path: action.path });
}

export default function* main() {
	yield fork(handleApps);
	yield fork(handleComponents);
	yield fork(handleProps);
	yield fork(handleAnalytics);
	yield fork(handleExpressions);
	yield fork(handleSagas);
	yield takeEvery(components.FileAnalytics.ACTION_TYPE_OPEN, onOpen);
	yield takeEvery('APP_REFRESH_DATA', refresh);
}
