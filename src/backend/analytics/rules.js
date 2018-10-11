
function checkHasDisplayName(item) {
	return (item.components || []).reduce((acc, component) => (
		acc || !component.displayName
	), false);
}

function checkHasPropTypes(item) {
	return (item.components || []).reduce((acc, component) => (
		acc || !component.propTypes
	), false);
}

const RULES = [
	checkHasDisplayName,
	checkHasPropTypes,
];

function getErrors(item) {
	return RULES.reduce((acc, current, code) => {
		const error = current(item);
		if (error) {
			return acc.concat(code);
		}
		return acc;
	}, []);
}

module.exports = {
	getErrors,
};
