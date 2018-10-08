import getCurrent from './getCurrent';
import getAll from './getAll';

const selectors = {
	getSaga: getCurrent,
	getSagas: getAll,
};

export default selectors;
