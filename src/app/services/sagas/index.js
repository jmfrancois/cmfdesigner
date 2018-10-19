import services from '../../experimental-cmf/services';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'sagas',
	API_URL: '/api/sagas',
});
export default services.register('designer.sagas', resourceConfig);
