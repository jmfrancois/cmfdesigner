import { select } from 'redux-saga/lib/effects';

export default function* getPath() {
	const data = yield select(state => state.cmf.collections.get('apps'));
	return data.get('path');
}
