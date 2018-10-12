// const hasKey = (props.item.key && props.item.name !== props.item.key);
// const hasParams = props.item.params && props.item.params.length > 0;
// <div>
// 	<h1>Expression: {hasKey ? props.item.key : props.item.name}</h1>
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
