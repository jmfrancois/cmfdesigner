import { SERVICE_COMPONENTS_SELECT_ONE } from '../constants';

export default function create(event, { id }) {
	if (event && event.persist) {
		event.persist();
	}
	return {
		type: SERVICE_COMPONENTS_SELECT_ONE,
		id,
		event,
	};
}
