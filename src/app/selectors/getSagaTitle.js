import modules from '../experimental-cmf/modules';

export default function getSagaTitle(state) {
	const service = modules.get('designer.sagas').inSelector();
	const saga = service.getCurrent(state);
	if (!saga) {
		return undefined;
	}
	const hasKey = (saga.key && saga.name !== saga.key);
	return hasKey ? `{ ${saga.key} : ${saga.name} }` : saga.name;
}
