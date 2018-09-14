import React from 'react';
import { cmfConnect } from '@talend/react-cmf';

import inject from '../../inject';

function App(props) {
	/**
	 * Instanciate all global components here
	 * Ex : we register @talend/react-components <IconsProvider />
	 * so that all icons are available in each view
	 */
	return (
		<div className="container">
			<div className="row">
				<div className="col-xs-6 col-md-5 col-lg-4" style={{ height: '100vh', overflow: 'auto' }}>
					{inject(props.left)}
				</div>
				<div className="col-xs-6 col-md-7 col-lg-8">
					{inject(props.center)}
				</div>
			</div>
		</div>
	);
}
App.displayName = 'App';
App.propTypes = {
	left: inject.propTypes,
	center: inject.propTypes,
};

export default cmfConnect({})(App);
