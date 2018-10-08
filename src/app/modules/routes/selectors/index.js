import getCurrent from './getCurrent';
import getAll from './getAll';

const selectors = {
	getRoute: getCurrent,
	getRoutes: getAll,
};

export default selectors;
