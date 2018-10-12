// const hasKey = (props.item.key && props.item.name !== props.item.key);
// const hasParams = props.item.params && props.item.params.length > 0;
// <div>
// 	<h1>Expression: {hasKey ? props.item.key : props.item.name}</h1>
import modules from '../experimental-cmf/modules';

export default function getExpressionTitle(state) {
	const service = modules.get('designer.expressions').inSelector();
	const expression = service.getCurrent(state);
	if (!expression) {
		return undefined;
	}
	const hasKey = (expression.key && expression.name !== expression.key);
	return hasKey ? `{ ${expression.key} : ${expression.name} }` : expression.name;
}
