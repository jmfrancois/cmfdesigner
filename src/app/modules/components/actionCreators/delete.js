import { SERVICE_COMPONENTS_DELETE_ONE } from '../constants';

export default function deleteAction(event, { id }) {
	if (event && event.persist) {
		event.persist();
	}
	return {
		type: SERVICE_COMPONENTS_DELETE_ONE,
		id,
		event,
	};
}
