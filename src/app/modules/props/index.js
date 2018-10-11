import modules from '../../experimental-cmf/modules';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'props',
	API_URL: '/api/props',
});
export default modules.register('designer.props', resourceConfig);
