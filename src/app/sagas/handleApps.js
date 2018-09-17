import { call, put, select, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
import components from '../components';
import { loadResource, deleteResource } from './resource';
// import { LOCAL_STORAGE_KEY_APPS } from '../constants';
import { APPS_LOADED } from '../constants';

function* initApps() {
	yield call(loadResource, {
		url: '/api/apps',
		id: 'apps',
	});
	const apps = yield select(state => state.cmf.collections.get('apps'));
	yield put({ type: APPS_LOADED, path: apps.get('path'), id: 'apps' });
}

function* onAddBtn() {
	yield put({
		type: 'ADD_APP_ROUTE_EFFECT',
		cmf: {
			routerPush: '/apps/add',
		},
	});
}

function* onAddFormSubmit(action) {
	if (action.componentId === 'app') {
		yield call(cmf.sagas.http.post, '/api/apps', action.data);
		yield call(initApps);
	}
}

// eslint-disable-next-line import/prefer-default-export
export function* handleApps() {
	yield call(initApps);
	yield takeEvery(components.AddForm.ACTION_TYPE_SUBMIT, onAddFormSubmit);
	yield takeEvery(components.AppSwitcher.ACTION_TYPE_ADD_APP, onAddBtn);
}
