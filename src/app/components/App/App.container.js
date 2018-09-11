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
				<div className="col-4">
					{inject(props.left)}
				</div>
				<div className="col-8">
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
