import modules from '../../experimental-cmf/modules';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'sagas',
	API_URL: '/api/sagas',
});
export default modules.register('designer.sagas', resourceConfig);
