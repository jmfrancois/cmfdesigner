import services from '../../experimental-cmf/services';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'expressions',
	API_URL: '/api/expressions',
});
export default services.register('designer.expressions', resourceConfig);
