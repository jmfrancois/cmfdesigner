import services from '../experimental-cmf/services';

export default function getSagaTitle(state) {
	const service = services.get('designer.sagas').inSelector();
	const saga = service.getCurrent(state);
	if (!saga) {
		return undefined;
	}
	const hasKey = (saga.key && saga.name !== saga.key);
	return hasKey ? `{ ${saga.key} : ${saga.name} }` : saga.name;
}
