import services from '../../experimental-cmf/services';
import resources from '../../experimental-cmf/resources';

const resourceConfig = resources({
	id: 'props',
	API_URL: '/api/props',
});
export default services.register('designer.props', resourceConfig);
