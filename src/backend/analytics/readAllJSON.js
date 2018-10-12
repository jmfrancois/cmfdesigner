const fs = require('fs');
const pathLib = require('path');

module.exports = function readAllJSON(path) {
	const result = {
		props: [],
		actions: [],
	};
	const content = fs.readdirSync(path);
	content.forEach(name => {
		if (name.endsWith('json')) {
			const settings = JSON.parse(fs.readFileSync(pathLib.join(path, name)));
			Object.keys(settings).forEach(kind => {
				if (kind === 'props') {
					Object.keys(settings.props).forEach(key => {
						result.props.push({
							path: pathLib.join(path, name),
							type: 'props',
							filename: name,
							id: key,
							name: key,
							value: settings.props[key],
						});
					});
				} else if (kind === 'actions') {
					Object.keys(settings.actions).forEach(key => {
						result.actions.push({
							path: pathLib.join(path, name),
							type: 'actions',
							filename: name,
							id: key,
							name: key,
							value: settings.actions[key],
						});
					});
				} else {
					result[kind] = {
						path: pathLib.join(path, name),
						type: kind,
						value: {
							...settings[kind],
						},
					};
				}
			});
		}
	});
	return result;
};
