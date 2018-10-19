import { call, put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { APPS_LOADED } from '../constants';
import services from '../experimental-cmf/services';

function* load() {
	const mod = services.get('designer.components').inSaga();
	yield mod.fetchAll();
}

function* onAddButtonClicked(action) {
	if (action.componentId === 'components') {
		// load components
		yield put({
			type: 'ADD_COMPONENT_ROUTE_EFFECT',
			cmf: {
				routerPush: '/components/add',
			},
		});
	}
}
function* onAddFormSubmit(action) {
	if (action.componentId === 'component') {
		const mod = services.get('designer.components').inSaga();
		yield call(mod.create, action.event, action.data);
		yield call(load);
	}
}

function* onSelectComponent(action) {
	if (action.componentId === 'components') {
		const mod = services.get('designer.components').inSaga();
		yield mod.select(action.event, { id: action.id });
		yield put({
			type: 'SELECT_PROPS_ROUTE_EFFECT',
			cmf: {
				routerPush: '/components/view',
			},
		});
	}
}

function* onDeleteBtn(action) {
	const mod = services.get('designer.components').inSaga();
	yield call(mod.delete, action.id);
	yield call(load);
	yield put({
		type: 'EFFECT_DELETE_COMPONENT_NEXT_ROUTE',
		cmf: { routerReplace: '/' },
	});
}

// eslint-disable-next-line import/prefer-default-export
export function* handleComponents() {
	yield takeEvery(APPS_LOADED, load);
	yield takeEvery(components.SelectionList.ACTION_TYPE_ADD_ITEM, onAddButtonClicked);
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelectComponent);
	yield takeEvery(components.AddForm.ACTION_TYPE_SUBMIT, onAddFormSubmit);
	yield takeEvery(components.ViewComponent.ACTION_TYPE_DELETE_BTN, onDeleteBtn);
}
