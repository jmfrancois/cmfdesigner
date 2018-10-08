import { put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { APPS_LOADED } from '../constants';
import modules from '../experimental-cmf/modules';

function* onSelectProps(action) {
	if (action.componentId === 'props') {
		const mod = modules.get('designer.props').inSaga();
		yield mod.select(action.event, { id: action.id });
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
	const mod = modules.get('designer.props').inSaga();
	yield mod.fetchAll();
}

// eslint-disable-next-line import/prefer-default-export
export function* handleProps() {
	yield takeEvery(APPS_LOADED, loadProps);
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelectProps);
	yield takeEvery(components.SelectionList.ACTION_TYPE_ADD_ITEM, onAddButtonClicked);
}
