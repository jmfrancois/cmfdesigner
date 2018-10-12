import { takeEvery, put } from 'redux-saga/lib/effects';
import { APPS_LOADED } from '../constants';
import modules from '../experimental-cmf/modules';
import components from '../components';

function* load() {
	const mod = modules.get('designer.logs').inSaga();
	yield mod.fetchAll();
}

function* onSelectComponent(action) {
	if (action.componentId === 'logs') {
		const mod = modules.get('designer.logs').inSaga();
		yield mod.select(action.event, { id: action.id });
		yield put({
			type: 'SELECT_LOGS_ROUTE_EFFECT',
			cmf: {
				routerPush: '/logs/view',
			},
		});
	}
}

// eslint-disable-next-line import/prefer-default-export
export function* handleLogs() {
	yield takeEvery(APPS_LOADED, load);
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelectComponent);
}
