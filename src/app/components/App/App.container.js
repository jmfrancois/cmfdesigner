import React from 'react';
import { cmfConnect, Inject } from '@talend/react-cmf';

import inject from '../../inject';

function App(props) {
	return (
		<div className="container">
			<Inject component="IconsProvider" />
			<div className="row">
				<div className="col-xs-6 col-md-5 col-lg-4" style={{ height: '100vh', overflow: 'auto' }}>
					{inject(props.left)}
				</div>
				<div className="col-xs-6 col-md-7 col-lg-8">{inject(props.center)}</div>
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
