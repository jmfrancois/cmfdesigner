import services from '../experimental-cmf/services';

export default function getComponentTitle(state) {
	const service = services.get('designer.components').inSelector();
	const component = service.getCurrent(state);
	return component ? component.name : null;
}
