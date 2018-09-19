import memoizeOne from 'memoize-one';
import getComponents from './getComponents';
import SelectionList from '../../components/SelectionList';

function getActiveComponent(components, id) {
	if (id) {
		const component = components.find(item => item.get('id') === id);
		if (component) {
			return component.toJS();
		}
	}
	return {};
}

const memoizedActiveComponent = memoizeOne(getActiveComponent);

export default function getComponent(args) {
	const components = getComponents(args);
	const state = args.context.store.getState();
	const id = SelectionList.getState(state, 'components').get('active');
	return memoizedActiveComponent(components, id);
}
