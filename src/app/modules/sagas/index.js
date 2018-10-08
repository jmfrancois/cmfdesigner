import modules from '../../modules';
import resources from '../../resources';

const resourceConfig = resources({
	id: 'sagas',
	API_URL: '/api/sagas',
});
export default modules.register('designer.sagas', resourceConfig);
