/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import '@talend/bootstrap-theme/src/theme/theme.scss';
import cmf, { cmfConnect } from '@talend/react-cmf';
import * as talendComponents from '@talend/react-components';
import ObjectViewer from '@talend/react-containers/lib/ObjectViewer';
import TreeView from '@talend/react-containers/lib/TreeView';
import getRouter from '@talend/react-cmf-router';

import './index.scss';
import appComponents from './components';
import selectors from './selectors';
import saga from './saga';
import componentsService from './services/components';
import expressionsService from './services/expressions';
import sagasService from './services/sagas';
import propsService from './services/props';
import poutesService from './services/routes';
import logsService from './services/logs';
import selectorTo from './experimental-cmf/selectorTo';

const DEFAULT_WITH_PROPS = { withComponentRegistry: true };
const router = getRouter();

function getWithProps(component) {
	if (component === 'Icon') {
		return {};
	}
	return DEFAULT_WITH_PROPS;
}

// just cmfConnect talend components
const onlyComponents = Object.keys(talendComponents)
	.filter(key => typeof talendComponents[key] === 'function')
	.reduce((acc, key) => ({
		...acc,
		[key]: cmfConnect(getWithProps(key))(talendComponents[key]),
	}), {});


const selectorsAsExpressions = {};
Object.keys(selectors).forEach(key => {
	selectorsAsExpressions[key] = selectorTo.toExpression(selectors[key]);
});

const talendComponentsModule = {
	id: 'talend-components',
	components: {
		...onlyComponents,
		ObjectViewer,
		TreeView,
	},
};

const cmfModule = {
	expressions: selectorsAsExpressions,
	components: appComponents,
	saga,
	settingsURL: '/settings.json',
	modules: [
		router.cmfModule,
		talendComponentsModule,
		logsService,
		componentsService,
		expressionsService,
		sagasService,
		propsService,
		poutesService,
	],
	RootComponent: router.RootComponent,
};

cmf.bootstrap(cmfModule);
