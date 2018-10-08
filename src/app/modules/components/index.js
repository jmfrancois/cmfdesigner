import modules from '../../modules';
import resources from '../../resources';

const resourceConfig = resources({
	id: 'components',
	API_URL: '/api/components',
});
export default modules.register('designer.components', resourceConfig);
