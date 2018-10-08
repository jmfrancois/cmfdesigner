import modules from '../../experimental-cmf/modules';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'expressions',
	API_URL: '/api/expressions',
});
export default modules.register('designer.expressions', resourceConfig);
