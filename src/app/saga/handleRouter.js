import { put, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
import components from '../components';
import { ROUTER_TREE_OPEN_COMPONENT, APPS_LOADED } from '../constants';
import modules from '../experimental-cmf/modules';

function* onOpenComponent(action) {
	const componentsModule = modules.get('designer.components').inSaga();
	const collection = yield componentsModule.getComponents();
	const found = collection.find(component => component.name === action.component);
	if (found) {
		// select it
		const id = `${found.path}#${found.name}`;
		const setStateAction = components.SelectionList.setStateAction({
			active: id,
		}, 'components');
		// setStateAction.cmf.routerPush = '/component/view';
		yield put(setStateAction);
		yield cmf.sagas.putActionCreator(
			components.SelectionList.ACTION_TYPE_SELECT_ITEM,
			null,
			{
				componentId: 'components',
				id,
			}
		);
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
