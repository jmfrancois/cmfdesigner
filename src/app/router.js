import React from 'react';
import createHashHistory from 'history/createHashHistory';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { Inject } from '@talend/react-cmf';

function getHistory() {
	return createHashHistory();
}

function getReduxMiddleware(history) {
	return routerMiddleware(history);
}

function insertReducerFactory(history) {
	return rootReducer => connectRouter(history)(rootReducer);
}

function getStoreHistory(history) {
	return history;
}

function getProvider(history) {
	return (
		<ConnectedRouter history={history}>
			<Inject component="App" componentId="default" />
		</ConnectedRouter>
	);
}

export default {
	getHistory,
	getProvider,
	getReduxMiddleware,
	insertReducerFactory,
	getStoreHistory,
};
