import modules from '../modules';

export default function isWebapp(state) {
	const componentsModule = modules.get('designer.components');
	return componentsModule.selectors.getComponent(state);
}
