import { call, put, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
import { SERVICE_COMPONENTS_FETCH_ALL, SERVICE_COMPONENTS_DELETE_ONE, SERVICE_COMPONENTS_CREATE_ONE, SERVICE_COMPONENTS_SELECT_ONE, SERVICE_COMPONENTS_COLLECTION_ID, SERVICE_COMPONENTS_CURRENT_COLLECTION_ID } from './constants';
import { loadResource } from '../../saga/resource';

function* fetchAllEffect() {
	yield call(loadResource, {
		url: '/api/components',
		id: SERVICE_COMPONENTS_COLLECTION_ID,
	});
}

function* createEffect(action) {
	yield call(cmf.sagas.http.post, '/api/components', action.data);
}

function* removeEffect(action) {
	yield call(cmf.sagas.http.delete, `/api/components/${action.id}`);
}

function* selectEffect(action) {
	yield put(cmf.actions.collections.addOrReplace(
		SERVICE_COMPONENTS_CURRENT_COLLECTION_ID, action.id
	));
}

// eslint-disable-next-line import/prefer-default-export
export default function* handleComponents() {
	yield takeEvery(SERVICE_COMPONENTS_DELETE_ONE, removeEffect);
	yield takeEvery(SERVICE_COMPONENTS_FETCH_ALL, fetchAllEffect);
	yield takeEvery(SERVICE_COMPONENTS_CREATE_ONE, createEffect);
	yield takeEvery(SERVICE_COMPONENTS_SELECT_ONE, selectEffect);
}
