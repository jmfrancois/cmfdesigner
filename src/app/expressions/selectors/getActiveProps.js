import memoizeOne from 'memoize-one';
import getProps from './getProps';
import SelectionList from '../../components/SelectionList';

function getActive(props, id) {
	if (id) {
		const prop = props.find(item => item.get('id') === id);
		if (prop) {
			return prop.toJS();
		}
	}
	return undefined;
}

const memoizedActiveComponent = memoizeOne(getActive);

export default function getActiveProps(args) {
	const props = getProps(args);
	const state = args.context.store.getState();
	const id = SelectionList.getState(state, 'props').get('active');
	return memoizedActiveComponent(props, id);
}
