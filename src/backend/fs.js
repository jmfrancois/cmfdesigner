const fs = require('fs');
const pathLib = require('path');

function exists(path) {
	return fs.existsSync(path);
}

function getCWD(req) {
	return req.app.locals.apps && req.app.locals.apps.path;
}

function getFolders(path) {
	const content = fs.readdirSync(path);
	return content.filter(name => fs.lstatSync(pathLib.join(path, name)).isDirectory());
}

function readAllJSON(path) {
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
}

module.exports = {
	exists,
	getCWD,
	getFolders,
	readAllJSON,
};
