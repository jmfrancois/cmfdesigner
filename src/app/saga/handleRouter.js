import { put, takeEvery } from 'redux-saga/lib/effects';
import cmf from '@talend/react-cmf';
import components from '../components';
import { APPS_LOADED } from '../constants';
import modules from '../experimental-cmf/modules';

function* onOpenComponent(action) {
	const componentsModule = modules.get('designer.components').inSaga();
	const collection = yield componentsModule.getAll();
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
	}
}

function* onOpenProps(action) {
	const componentId = 'props';
	const propsService = modules.get('designer.props').inSaga();
	const collection = yield propsService.getAll();
	const found = collection.find(item => item.name === action.propsId);
	if (found) {
		// select it
		const id = found.name;
		const setStateAction = components.SelectionList.setStateAction({
			active: id,
		}, componentId);
		yield put(setStateAction);
		yield cmf.sagas.putActionCreator(
			components.SelectionList.ACTION_TYPE_SELECT_ITEM,
			null,
			{
				componentId,
				id,
			}
		);
	}
}

function* loadRoutes() {
	const mod = modules.get('designer.routes').inSaga();
	yield mod.fetchAll();
}

// eslint-disable-next-line import/prefer-default-export
export function* handleRouter() {
	yield takeEvery(APPS_LOADED, loadRoutes);
	yield takeEvery(components.ViewRouter.ROUTER_TREE_OPEN_COMPONENT, onOpenComponent);
	yield takeEvery(components.ViewRouter.ROUTER_TREE_OPEN_PROPS, onOpenProps);
}
