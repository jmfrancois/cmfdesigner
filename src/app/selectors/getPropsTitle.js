import modules from '../experimental-cmf/modules';

export default function getPropsTitle(state) {
	const service = modules.get('designer.props').inSelector();
	const prop = service.getCurrent(state);
	if (!prop) {
		return undefined;
	}
	const hasKey = (prop.key && prop.name !== prop.key);
	return hasKey ? `{ ${prop.key} : ${prop.name} }` : prop.name;
}
