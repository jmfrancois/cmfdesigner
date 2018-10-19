import services from '../../experimental-cmf/services';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'components',
	API_URL: '/api/components',
});
export default services.register('designer.components', resourceConfig);
