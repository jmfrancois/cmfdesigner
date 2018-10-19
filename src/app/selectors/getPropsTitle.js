import services from '../experimental-cmf/services';

export default function getPropsTitle(state) {
	const service = services.get('designer.props').inSelector();
	const prop = service.getCurrent(state);
	if (!prop) {
		return undefined;
	}
	const hasKey = (prop.key && prop.name !== prop.key);
	return hasKey ? `{ ${prop.key} : ${prop.name} }` : prop.name;
}
