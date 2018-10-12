import modules from '../experimental-cmf/modules';

export default function getLogs(state) {
	const service = modules.get('designer.logs').inSelector();
	const logs = service.getAll(state);
	return (logs || []).map(log => ({
		name: log.message,
		...log,
	}));
}
