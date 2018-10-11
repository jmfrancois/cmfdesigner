import { call, put, select } from 'redux-saga/lib/effects';
import api from '@talend/react-cmf';

export function* loadResource(resource) {
	const { data, response } = yield call(api.sagas.http[resource.method || 'get'], resource.url);
	if (response.ok) {
		yield put(api.actions.collections.addOrReplace(resource.id, data));
	}
}

export function* loadResourceOnDidMount(action, resource) {
	yield loadResource(resource);
}

export function* deleteResource(id) {
	const collection = yield select(state => state.cmf.collections.get(id));
	if (collection) {
		yield put(api.actions.collections.remove(id));
	}
}
