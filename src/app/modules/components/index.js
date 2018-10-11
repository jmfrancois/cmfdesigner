import modules from '../../experimental-cmf/modules';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'components',
	API_URL: '/api/components',
});
export default modules.register('designer.components', resourceConfig);
