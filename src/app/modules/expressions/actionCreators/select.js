import { SERVICE_SELECT_ONE } from '../constants';

export default function create(event, { id }) {
	if (event && event.persist) {
		event.persist();
	}
	return {
		type: SERVICE_SELECT_ONE,
		id,
		event,
	};
}
