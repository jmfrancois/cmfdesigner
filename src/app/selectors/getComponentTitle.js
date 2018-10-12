import modules from '../experimental-cmf/modules';

export default function getComponentTitle(state) {
	const service = modules.get('designer.components').inSelector();
	const component = service.getCurrent(state);
	return component ? component.name : null;
}
