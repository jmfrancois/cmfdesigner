import memoizeOne from 'memoize-one';
import getComponents from './getComponents';

function getActive(components, id) {
	if (id) {
		const component = components.find(item => item.get('id') === id);
		if (component) {
			return component.toJS();
		}
	}
	return {};
}

const memoizedActiveComponent = memoizeOne(getActive);

export default function getActiveComponent(args) {
	const components = getComponents(args);
	const id = args.payload.match.params.id.replace('-', '#');
	return memoizedActiveComponent(components, id);
}
