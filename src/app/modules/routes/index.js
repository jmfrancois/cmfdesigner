import actionCreators from './actionCreators';
import selectors from './selectors';
import saga from './saga';
import modules from '../../modules';
import selectorTo from '../../selectorTo';

const expressions = {};
const sagas = {};
// this operation should be done during the register of the module in CMF
Object.keys(selectors).forEach(key => {
	expressions[key] = selectorTo.toExpression(selectors[key], key);
	sagas[key] = selectorTo.toSaga(selectors[key], key);
});

const config = {
	// selectors,
	actionCreators,
	expressions,
	sagas,
	saga,
};

modules.register('designer.routes', { selectors, ...config });

export default config;
