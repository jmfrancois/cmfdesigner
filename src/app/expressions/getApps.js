import Immutable from 'immutable';
import { LOCAL_STORAGE_KEY_APPS } from '../constants';

const cache = {};

export function getApps() {
	const cacheKey = localStorage[LOCAL_STORAGE_KEY_APPS];
	if (cacheKey) {
		if (cache.key === cacheKey) {
			return cache.value;
		}
		const apps = JSON.parse(cacheKey);
		cache.key = cacheKey;
		cache.value = Immutable.fromJS(Object.keys(apps).map(path => ({
			path,
			name: apps[path],
		})));
		return cache.value;
	}
	return new Immutable.List();
}

