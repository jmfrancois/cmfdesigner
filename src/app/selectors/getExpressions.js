import getCollection from './getCollection';

export default function getExpressions(state) {
	return getCollection(state, 'expressions');
}
