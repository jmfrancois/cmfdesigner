import modules from '../../experimental-cmf/modules';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'routes',
	API_URL: '/api/routes',
});
export default modules.register('designer.routes', resourceConfig);
