import services from '../experimental-cmf/services';

export default function getPropsValue(state) {
	const service = services.get('designer.props').inSelector();
	const component = service.getCurrent(state);
	return component ? component.value : null;
}
