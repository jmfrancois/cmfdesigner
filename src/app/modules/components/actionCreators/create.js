import { SERVICE_COMPONENTS_CREATE_ONE } from '../constants';

export default function create(event, data) {
	if (event && event.persist) {
		event.persist();
	}
	return {
		type: SERVICE_COMPONENTS_CREATE_ONE,
		data,
		event,
	};
}
