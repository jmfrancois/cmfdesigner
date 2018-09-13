import { select } from 'redux-saga/lib/effects';
import components from '../components';

export default function* getPath() {
	const state = yield select(components.AppSwitcher.getState);
	return state.get('path');
}
