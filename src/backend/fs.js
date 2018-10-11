const fs = require('fs');
const pathLib = require('path');
/* eslint-disable no-console */

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
	};
	const content = fs.readdirSync(path);
	content.forEach(name => {
		if (name.endsWith('json')) {
			console.log('read', name);
			const settings = JSON.parse(fs.readFileSync(pathLib.join(path, name)));
			Object.keys(settings).forEach(kind => {
				if (kind === 'props') {
					Object.keys(settings.props).forEach(key => {
						result.props.push({
							path: pathLib.join(path, name),
							filename: name,
							id: key,
							name: key,
							value: settings.props[key],
						});
					});
				} else {
					result[kind] = { ...(result[kind] || {}), ...settings[kind] };
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
