
import { SERVICE_FETCH_ALL } from '../constants';

export default function fetchAll() {
	console.log('###### fetch all');
	return {
		type: SERVICE_FETCH_ALL,
	};
}
