import memoizeOne from 'memoize-one';
import getProps from './getProps';

function getActive(props, id) {
	if (id) {
		const prop = props.find(item => item.get('id') === id);
		if (prop) {
			return prop.toJS();
		}
	}
	return undefined;
}

const memoizedActiveProps = memoizeOne(getActive);

export default function getActiveProps(args) {
	const props = getProps(args);
	const id = args.payload.match.params.id.replace('-', '#');
	return memoizedActiveProps(props, id);
}
