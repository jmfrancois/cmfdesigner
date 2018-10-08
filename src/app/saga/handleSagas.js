import { put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { APPS_LOADED } from '../constants';
import modules from '../experimental-cmf/modules';

function* load() {
	const mod = modules.get('designer.sagas').inSaga();
	yield mod.fetchAll();
}

function* onSelect(action) {
	if (action.componentId === 'sagas') {
		const mod = modules.get('designer.sagas').inSaga();
		yield mod.select(action.event, { id: action.id });
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
