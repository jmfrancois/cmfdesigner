import { call, put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { loadResource } from './resource';
import { APPS_LOADED } from '../constants';

function* load() {
	yield call(loadResource, {
		url: '/api/expressions',
		id: 'expressions',
	});
}

function* onSelect(action) {
	if (action.componentId === 'expressions') {
		yield put({
			type: 'SELECT_PROPS_ROUTE_EFFECT',
			cmf: {
				routerPush: '/expressions/view',
			},
		});
	}
}

// eslint-disable-next-line import/prefer-default-export
export function* handleExpressions() {
	yield takeEvery(APPS_LOADED, load);
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelect);
}
