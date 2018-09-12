import { call, put, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
import AddComponentForm from '../components/AddComponentForm';
import SelectionList from '../components/SelectionList';
import { loadResource } from './resource';

function* onSelect(action) {
	if (action.componentId === 'apps') {
		// load components
		yield call(loadResource, {
			url: `/api/apps/${action.id}/components`,
			id: 'components',
		});
	}
}

function* onAddButtonClicked(action) {
	if (action.componentId === 'components') {
		// load components
		yield put({
			type: 'ADD_COMPONENT_ROUTE_EFFECT',
			cmf: {
				routerPush: '/addComponent',
			},
		});
	}
}
function* onAddFormSubmit(action) {
	yield call(cmf.sagas.http.post, '/api/components', action.data);
}

// eslint-disable-next-line import/prefer-default-export
export function* handleComponents() {
	yield takeEvery(SelectionList.ACTION_TYPE_SELECT_ITEM, onSelect);
	yield takeEvery(SelectionList.ACTION_TYPE_ADD_ITEM, onAddButtonClicked);
	yield takeEvery(AddComponentForm.ACTION_TYPE_SUBMIT, onAddFormSubmit);
}
