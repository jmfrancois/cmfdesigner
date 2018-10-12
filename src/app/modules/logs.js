import modules from '../experimental-cmf/modules';
import resources from '../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'logs',
	API_URL: '/api/logs',
});
export default modules.register('designer.logs', resourceConfig);
