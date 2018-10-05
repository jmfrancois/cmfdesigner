import getCurrent from './getCurrent';
import getAll from './getAll';

const selectors = {
	getExpression: getCurrent,
	getExpressions: getAll,
};

export default selectors;
