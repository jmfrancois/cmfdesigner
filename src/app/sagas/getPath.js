import { select } from 'redux-saga/lib/effects';

export default function* getPath() {
	return yield select(state => state.cmf.collections.getIn(['apps', 'path']));
}
