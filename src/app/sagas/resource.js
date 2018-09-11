import { call, put, select } from 'redux-saga/lib/effects';
import api from '@talend/react-cmf';

const cache = {};

function getCollection(id) {
	return state => state.cmf.collections.get(id);
}

export function* loadResource(action, resource) {
	if (!cache[resource.id]) {
		const collection = yield select(getCollection(resource.id));
		if (!collection) {
			const { data, response } = yield call(api.sagas.http[resource.method || 'get'], resource.url);
			if (response.ok) {
				yield put(api.actions.collections.addOrReplace(resource.id, data));
			}
			cache[resource.id] = true;
		} else {
			cache[resource.id] = true;
		}
	}
}
