import { call, put, select } from 'redux-saga/lib/effects';
import api from '@talend/react-cmf';

const cache = {};

function getCollection(id) {
	return state => state.cmf.collections.get(id);
}

export function* loadResource(resource) {
	// if (!cache[resource.id]) {
	// const collection = yield select(getCollection(resource.id));
	const { data, response } = yield call(api.sagas.http[resource.method || 'get'], resource.url);
	if (response.ok) {
		yield put(api.actions.collections.addOrReplace(resource.id, data));
	}
	// 	cache[resource.id] = true;
	// } else {
	// 	cache[resource.id] = true;
	// }
	// }
}

export function* loadResourceOnDidMount(action, resource) {
	yield loadResource(resource);
}

export function* deleteResource(id) {
	const collection = yield select(state => state.cmf.collections.get(id));
	if (collection) {
		delete cache[id];
		yield put(api.actions.collections.remove(id));
	}
}
