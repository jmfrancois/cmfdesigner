import { select, put, takeEvery } from 'redux-saga/lib/effects';
import components from '../components';
import { ROUTER_TREE_OPEN_COMPONENT, APPS_LOADED } from '../constants';
import modules from '../modules';

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

function* loadRoutes() {
	const mod = modules.get('designer.routes').inSaga();
	yield mod.fetchAll();
}

// eslint-disable-next-line import/prefer-default-export
export function* handleRouter() {
	yield takeEvery(APPS_LOADED, loadRoutes);
	yield takeEvery(ROUTER_TREE_OPEN_COMPONENT, onOpenComponent);
}
