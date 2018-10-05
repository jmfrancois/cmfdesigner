import { SERVICE_COMPONENTS_CURRENT_COLLECTION_ID } from '../constants';
import getComponents from './getComponents';

const cache = {};

export default function getComponent(state) {
	const id = state.cmf.collections.get(SERVICE_COMPONENTS_CURRENT_COLLECTION_ID);
	if (cache.key !== id) {
		cache.key = id;
		delete cache.value;
		const components = getComponents(state);
		const found = components.find(component => component.id === id);
		if (found) {
			cache.value = found;
		}
	}
	return cache.value;
}
