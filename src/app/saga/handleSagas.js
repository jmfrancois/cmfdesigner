import { call, put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { loadResource } from './resource';
import { APPS_LOADED } from '../constants';

function* load() {
	yield call(loadResource, {
		url: '/api/sagas',
		id: 'sagas',
	});
}

function* onSelect(action) {
	if (action.componentId === 'sagas') {
		yield put({
			type: 'SELECT_PROPS_ROUTE_EFFECT',
			cmf: {
				routerPush: '/sagas/view',
			},
		});
	}
}

// eslint-disable-next-line import/prefer-default-export
export function* handleSagas() {
	yield takeEvery(APPS_LOADED, load);
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelect);
}
