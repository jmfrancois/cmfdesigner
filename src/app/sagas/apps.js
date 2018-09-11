import { loadResource } from './resource';

export function* apps() {
	yield loadResource({
		id: 'apps',
		url: '/api/apps',
		method: 'get',
	});
}
