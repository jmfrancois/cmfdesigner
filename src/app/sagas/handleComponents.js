import { call, select, put, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
import components from '../components';
import { loadResource } from './resource';
import getPath from './getPath';

function* onSelectDirectory(action) {
	yield call(loadResource, {
		url: `/api/components?path=${action.path}`,
		id: 'components',
	});
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
	const path = yield getPath();
	if (!path) {
		debugger;
	}
	yield call(cmf.sagas.http.post, '/api/components', { $$path: path, ...action.data });
}

function* onSelectComponent(action) {
	if (action.componentId === 'components') {
		yield put({
			type: 'SELECT_PROPS_ROUTE_EFFECT',
			cmf: {
				routerPush: '/components/view',
			},
		});
	}
}

function* onDeleteBtn(action) {
	const path = yield getPath();
	if (!path) {
		debugger;
	}
	yield call(cmf.sagas.http.delete, `/api/components/${action.id}?path=${path}`);
}

// eslint-disable-next-line import/prefer-default-export
export function* handleComponents() {
	yield takeEvery(components.AppSwitcher.ACTION_TYPE_SET_CWD, onSelectDirectory);
	yield takeEvery(components.SelectionList.ACTION_TYPE_ADD_ITEM, onAddButtonClicked);
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelectComponent);
	yield takeEvery(components.AddForm.ACTION_TYPE_SUBMIT, onAddFormSubmit);
	yield takeEvery(components.ViewComponent.ACTION_TYPE_DELETE_BTN, onDeleteBtn);
}
