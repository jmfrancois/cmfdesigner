import modules from '../../modules';
import resources from '../../resources';

const resourceConfig = resources({
	id: 'routes',
	API_URL: '/api/routes',
});
export default modules.register('designer.routes', resourceConfig);
