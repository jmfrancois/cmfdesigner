import modules from '../modules';

export default function isWebapp(state) {
	const componentsModule = modules.get('designer.components').inSelector();
	return !!componentsModule.getAll(state);
}
