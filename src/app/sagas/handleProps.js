import { call, put, takeEvery } from 'redux-saga/lib/effects';
// import cmf from '@talend/react-cmf';
import components from '../components';
import { loadResource } from './resource';
import { APPS_LOADED } from '../constants';

function* onSelectProps(action) {
	if (action.componentId === 'props') {
		yield put({
			type: 'SELECT_PROPS_ROUTE_EFFECT',
			cmf: {
				routerPush: '/props/view',
			},
		});
	}
}
function* onAddButtonClicked(action) {
	if (action.componentId === 'props') {
		yield put({
			type: 'SELECT_PROPS_ROUTE_EFFECT',
			cmf: {
				routerPush: '/props/add',
			},
		});
	}
}

function* loadProps() {
	yield call(loadResource, {
		url: '/api/props',
		id: 'props',
	});
}

// eslint-disable-next-line import/prefer-default-export
export function* handleProps() {
	yield takeEvery(APPS_LOADED, loadProps);
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelectProps);
	yield takeEvery(components.SelectionList.ACTION_TYPE_ADD_ITEM, onAddButtonClicked);
}
