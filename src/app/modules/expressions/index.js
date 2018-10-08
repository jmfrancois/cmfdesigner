import modules from '../../modules';
import resources from '../../resources';

const resourceConfig = resources({
	id: 'expressions',
	API_URL: '/api/expressions',
});
export default modules.register('designer.expressions', resourceConfig);
