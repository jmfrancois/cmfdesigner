import services from '../experimental-cmf/services';

export default function getExpressionTitle(state) {
	const service = services.get('designer.expressions').inSelector();
	const expression = service.getCurrent(state);
	if (!expression) {
		return undefined;
	}
	const hasKey = (expression.key && expression.name !== expression.key);
	return hasKey ? `{ ${expression.key} : ${expression.name} }` : expression.name;
}
