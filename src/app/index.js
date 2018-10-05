/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import '@talend/bootstrap-theme/src/theme/theme.scss';
import cmf, { cmfConnect } from '@talend/react-cmf';
import * as talendComponents from '@talend/react-components';
import { ObjectViewer } from '@talend/react-containers';

import './index.scss';
import actions from './actions';
import appComponents from './components';
import * as expressions from './expressions';
import selectors from './selectors';
import saga from './saga';
import moduleComponents from './modules/components';
import moduleExpressions from './modules/expressions';
import merge from './mergeModules';
import selectorTo from './selectorTo';

// just cmfConnect talend components
const onlyComponents = Object.keys(talendComponents)
	.filter(key => typeof talendComponents[key] === 'function')
	.reduce((acc, key) => ({
		...acc,
		[key]: cmfConnect({})(talendComponents[key]),
	}), {});


const selectorsAsExpressions = {};
Object.keys(selectors).forEach(key => {
	selectorsAsExpressions[key] = selectorTo.toExpression(selectors[key]);
});

/**
 * Initialize CMF
 * This will:
 * - Register your components in the CMF registry
 * - Register your action creators in CMF registry
 * - Setup redux store using reducer
 * - Fetch the settings
 * - render react-dom in the dom 'app' element
 */
cmf.bootstrap(merge(
	{
		components: onlyComponents,
		expressions: selectorsAsExpressions,
	}, {
		components: { ObjectViewer },
	}, {
		components: appComponents,
		expressions,
		saga,
		settingsURL: '/settings.json',
		actionCreators: actions,
	},
	moduleComponents,
	moduleExpressions
));
