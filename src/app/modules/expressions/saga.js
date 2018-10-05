import { call, put, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
import { SERVICE_FETCH_ALL, SERVICE_DELETE_ONE, SERVICE_CREATE_ONE, SERVICE_SELECT_ONE, SERVICE_COLLECTION_ID, SERVICE_CURRENT_COLLECTION_ID } from './constants';
import { loadResource } from '../../saga/resource';

function* fetchAllEffect() {
	yield call(loadResource, {
		url: '/api/expressions',
		id: SERVICE_COLLECTION_ID,
	});
}

function* createEffect(action) {
	yield call(cmf.sagas.http.post, '/api/expressions', action.data);
}

function* removeEffect(action) {
	yield call(cmf.sagas.http.delete, `/api/expressions/${action.id}`);
}

function* selectEffect(action) {
	yield put(cmf.actions.collections.addOrReplace(
		SERVICE_CURRENT_COLLECTION_ID, action.id
	));
}

// eslint-disable-next-line import/prefer-default-export
export default function* handleComponents() {
	yield takeEvery(SERVICE_DELETE_ONE, removeEffect);
	yield takeEvery(SERVICE_FETCH_ALL, fetchAllEffect);
	yield takeEvery(SERVICE_CREATE_ONE, createEffect);
	yield takeEvery(SERVICE_SELECT_ONE, selectEffect);
}
