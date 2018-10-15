
import cmf from '@talend/react-cmf';
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { Map } from 'immutable';
import { APPS_LOADED } from '../constants';

export default function* refresh() {
	const ActionButton = cmf.component.get('ActionButton');
	yield put(ActionButton.setStateAction(new Map({ iconTransform: 'spin' }), 'refresh'));
	const refreshAnalytics = yield call(cmf.sagas.http.post, '/api/analytics');
	if (refreshAnalytics.response.ok && refreshAnalytics.data) {
		yield put(cmf.actions.collections.addOrReplace('analytics', refreshAnalytics.data));
	}
	yield put({ type: APPS_LOADED });
	yield call(delay, 600);
	yield put(ActionButton.setStateAction(new Map({ iconTransform: undefined }), 'refresh'));
}
