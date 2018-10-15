
function checkHasDisplayName(item) {
	return (item.components || []).reduce((acc, component) => {
		if (component && !component.displayName) {
			return acc.concat({
				code: 0,
				target: component.name,
				level: 'error',
			});
		}
		return acc;
	}, []);
}

function checkHasPropTypes(item) {
	return (item.components || []).reduce((acc, component) => {
		if (component && !component.hasPropTypes) {
			return acc.concat({
				code: 1,
				target: component.name,
				level: 'warning',
			});
		}
		return acc;
	}, []);
}

function checkHasDependents(item) {
	if ((item.dependents || []).length === 0 && !item.path.endsWith('.json') && !item.path.endsWith('.test.js') && !item.path.endsWith('index.js')) {
		return [{ code: 2, target: 'file', level: 'error' }];
	}
	return [];
}

function checkSettingsPropsId(item) {
	if (item.type === 'props' && item.name.split('#').length !== 2) {
		return [{ code: 3, target: item.name, level: 'error' }];
	}
	return [];
}

const RULES = [
	checkHasDisplayName,
	checkHasPropTypes,
	checkHasDependents,
	checkSettingsPropsId,
];

function log(item) {
	return RULES.reduce((acc, current) => {
		const logs = current(item);
		if (logs.length > 0) {
			return acc.concat(logs);
		}
		return acc;
	}, []);
}

module.exports = {
	log,
};
