import services from '../experimental-cmf/services';
import resources from '../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'logs',
	API_URL: '/api/logs',
});
export default services.register('designer.logs', resourceConfig);
