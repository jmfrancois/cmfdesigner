import { select, put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { ROUTER_TREE_OPEN_COMPONENT } from '../constants';

function* onOpenComponent(action) {
	const collection = yield select(state => state.cmf.collections.get('components'));
	const found = collection.find(component => component.get('name') === action.component);
	if (found) {
		// select it
		const id = `${found.get('path')}#${found.get('name')}`;
		const setStateAction = components.SelectionList.setStateAction({
			active: id,
		}, 'components');
		// setStateAction.cmf.routerPush = '/component/view';
		yield put(setStateAction);
		yield put(components.SelectionList.actions.onClickSelectionListItem(null, {
			componentId: 'components',
			id,
		}));
	} else {
		console.log('component not found: ', action.component);
	}
}

// eslint-disable-next-line import/prefer-default-export
export function* handleRouter() {
	yield takeEvery(ROUTER_TREE_OPEN_COMPONENT, onOpenComponent);
}
