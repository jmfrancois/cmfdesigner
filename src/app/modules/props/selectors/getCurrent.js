import { SERVICE_CURRENT_COLLECTION_ID } from '../constants';
import getAll from './getAll';

const cache = {};

export default function getCurrent(state) {
	const id = state.cmf.collections.get(SERVICE_CURRENT_COLLECTION_ID);
	if (cache.key !== id) {
		cache.key = id;
		delete cache.value;
		const components = getAll(state);
		const found = components.find(component => component.id === id);
		if (found) {
			cache.value = found;
		}
	}
	return cache.value;
}
