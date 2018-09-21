import { call, put, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
// import { routerActions } from '@talend/react-cmf-router';
import { routerActions } from '../router';

import components from '../components';
import { loadResource } from './resource';
import { APPS_LOADED } from '../constants';

function* onSelectProps(action) {
	if (action.componentId === 'props') {
		yield put(routerActions.push(`/props/view/${action.id.replace('#', '-')}`));
	}
}
function* onAddButtonClicked(action) {
	if (action.componentId === 'props') {
		yield put(routerActions.push('/props/add'));
	}
}

function* loadProps() {
	yield call(loadResource, {
		url: '/api/props',
		id: 'props',
	});
}

function* openProps(action) {
	yield call(cmf.sagas.http.post, '/api/props/open', action.item);
}

// eslint-disable-next-line import/prefer-default-export
export function* handleProps() {
	yield takeEvery(APPS_LOADED, loadProps);
	yield takeEvery(components.SelectionList.ACTION_TYPE_SELECT_ITEM, onSelectProps);
	yield takeEvery(components.SelectionList.ACTION_TYPE_ADD_ITEM, onAddButtonClicked);
	yield takeEvery(components.ViewProps.ACTION_TYPE_CLICK_OPEN, openProps);
}
