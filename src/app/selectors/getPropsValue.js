import modules from '../experimental-cmf/modules';

export default function getPropsValue(state) {
	const service = modules.get('designer.props').inSelector();
	const component = service.getCurrent(state);
	return component ? component.value : null;
}
