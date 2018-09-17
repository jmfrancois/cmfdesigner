/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import '@talend/bootstrap-theme/src/theme/theme.scss';
import cmf, { cmfConnect } from '@talend/react-cmf';
import * as talendComponents from '@talend/react-components';
import actions from './actions';
import appComponents from './components';
import * as expressions from './expressions';
import * as sagas from './sagas';

const onlyComponents = Object.keys(talendComponents)
	.filter(key => typeof talendComponents[key] === 'function')
	.reduce((acc, key) => ({
		...acc,
		[key]: cmfConnect({})(talendComponents[key]),
	}), {});

const components = {
	...onlyComponents,
	...appComponents,
};

/**
 * Initialize CMF
 * This will:
 * - Register your components in the CMF registry
 * - Register your action creators in CMF registry
 * - Setup redux store using reducer
 * - Fetch the settings
 * - render react-dom in the dom 'app' element
 */
cmf.bootstrap({
	components,
	expressions,
	sagas,
	settingsURL: '/settings.json',
	actionCreators: actions,
});
