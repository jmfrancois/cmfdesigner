import { SERVICE_COMPONENTS_COLLECTION_ID } from '../constants';

const cache = {};

export default function getComponents(state) {
	const components = state.cmf.collections.get(SERVICE_COMPONENTS_COLLECTION_ID);
	if (cache.key !== components) {
		cache.key = components;
		cache.value = components.toJS();
	}
	return cache.value;
}
