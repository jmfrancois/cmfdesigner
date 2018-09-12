import { put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { LOCAL_STORAGE_KEY_APPS } from '../constants';

function* onAddBtn(action) {
	if (action.componentId === 'apps') {
		yield put({
			type: 'ADD_APP_ROUTE_EFFECT',
			cmf: {
				routerPush: '/addApp',
			},
		});
	}
}

function* onSubmit(action) {
	if (action.componentId === 'apps') {
		const data = JSON.parse(localStorage[LOCAL_STORAGE_KEY_APPS] || '{}');
		data[action.data.path] = action.data.name;
		localStorage.setItem(LOCAL_STORAGE_KEY_APPS, JSON.stringify(data));
	}
}

// eslint-disable-next-line import/prefer-default-export
export function* handleApps() {
	yield takeEvery(components.SelectionList.ACTION_TYPE_ADD_ITEM, onAddBtn);
	yield takeEvery(components.AddForm.ACTION_TYPE_SUBMIT, onSubmit);
}
