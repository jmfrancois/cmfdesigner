import { put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { LOCAL_STORAGE_KEY_APPS } from '../constants';

function* onAddBtn() {
	yield put({
		type: 'ADD_APP_ROUTE_EFFECT',
		cmf: {
			routerPush: '/apps/add',
		},
	});
}

function* onSubmit(action) {
	if (action.componentId === 'app') {
		const data = JSON.parse(localStorage[LOCAL_STORAGE_KEY_APPS] || '{}');
		data[action.data.path] = action.data.name;
		localStorage.setItem(LOCAL_STORAGE_KEY_APPS, JSON.stringify(data));
	}
}

// eslint-disable-next-line import/prefer-default-export
export function* handleApps() {
	yield takeEvery(components.AppSwitcher.APP_SWITCHER_ADD_APP, onAddBtn);
	yield takeEvery(components.AddForm.ACTION_TYPE_SUBMIT, onSubmit);
}
