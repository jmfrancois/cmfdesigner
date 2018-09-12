import { call, select, put, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
import components from '../components';
import { loadResource } from './resource';

function* onSelect(action) {
	if (action.componentId === 'apps') {
		// load components
		yield call(loadResource, {
			url: `/api/props?path=${action.id}`,
			id: 'props',
		});
	}
	if (action.componentId === 'props') {
		yield put({
			type: 'SELECT_PROPS_ROUTE_EFFECT',
			cmf: {
				routerPush: '/props/view',
			},
		});
	}
}

// function* onAddButtonClicked(action) {
// 	if (action.componentId === 'components') {
// 		// load components
// 		yield put({
// 			type: 'ADD_COMPONENT_ROUTE_EFFECT',
// 			cmf: {
// 				routerPush: '/addComponent',
// 			},
// 		});
// 	}
// }
// function* onAddFormSubmit(action) {
// 	const state = yield select();
// 	const path = components.SelectionList.getState(state, 'apps').get('active');
// 	if (!path) {
// 		debugger;
// 	}
// 	yield call(cmf.sagas.http.post, '/api/components', { $$path: path, ...action.data });
// }

// eslint-disable-next-line import/prefer-default-export
export function* handleProps() {
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelect);
	// yield takeEvery(components.SelectionList.ACTION_TYPE_ADD_ITEM, onAddButtonClicked);
	// yield takeEvery(components.AddForm.ACTION_TYPE_SUBMIT, onAddFormSubmit);
}
