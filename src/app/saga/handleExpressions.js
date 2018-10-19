import { put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { APPS_LOADED } from '../constants';
import services from '../experimental-cmf/services';

function* load() {
	const mod = services.get('designer.expressions').inSaga();
	yield mod.fetchAll();
}

function* onSelect(action) {
	if (action.componentId === 'expressions') {
		const mod = services.get('designer.expressions').inSaga();
		yield mod.select(action.event, { id: action.id });
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
