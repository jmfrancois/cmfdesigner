import { call, select, put, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
import components from '../components';
import { loadResource } from './resource';

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

function* onSelectDirectory(action) {
	yield call(loadResource, {
		url: `/api/props?path=${action.path}`,
		id: 'props',
	});
}

// eslint-disable-next-line import/prefer-default-export
export function* handleProps() {
	yield takeEvery(components.AppSwitcher.ACTION_TYPE_SET_CWD, onSelectDirectory);
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelectProps);
	yield takeEvery(components.SelectionList.ACTION_TYPE_ADD_ITEM, onAddButtonClicked);
	// yield takeEvery(components.AddForm.ACTION_TYPE_SUBMIT, onAddFormSubmit);
}
