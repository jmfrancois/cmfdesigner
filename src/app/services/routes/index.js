import services from '../../experimental-cmf/services';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'routes',
	API_URL: '/api/routes',
});
export default services.register('designer.routes', resourceConfig);
