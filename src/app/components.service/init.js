import cmf from '@talend/react-cmf';
import selectors from './selectors';
import actionCreators from './actionCreators';

export default cmf.service.create('components', {
	selectors,
	actionCreators,
});
