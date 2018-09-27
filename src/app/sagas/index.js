
import { fork } from 'redux-saga/effects';
import { handleApps } from './handleApps';
import { handleProps } from './handleProps';
import { handleComponents } from './handleComponents';
import { handleExpressions } from './handleExpressions';
import { handleAnalytics } from './handleAnalytics';
import { handleSagas } from './handleSagas';

export default function* main() {
	yield fork(handleApps);
	yield fork(handleComponents);
	yield fork(handleProps);
	yield fork(handleAnalytics);
	yield fork(handleExpressions);
	yield fork(handleSagas);
}
