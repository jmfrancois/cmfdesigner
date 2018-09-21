import React from 'react';
import createHashHistory from 'history/createHashHistory';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { Inject } from '@talend/react-cmf';
import get from 'lodash/get';

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

function rootComponent(history) {
	return (
		<ConnectedRouter history={history}>
			<Inject component="App" componentId="default" />
		</ConnectedRouter>
	);
}

function getCurrentPathname(state) {
	return get(state, 'router.location.pathname');
}

export default {
	getCurrentPathname,
	getHistory,
	getReduxMiddleware,
	getStoreHistory,
	insertReducerFactory,
	rootComponent,
};
