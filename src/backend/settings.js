const pathLib = require('path');
const fs = require('./fs');

const SETTINGS_KEY = 'cmf-settings';

function load(app) {
	const path = pathLib.join(app.locals.apps.path, 'src/settings/');
	// eslint-disable-next-line no-param-reassign
	app.locals[SETTINGS_KEY] = fs.readAllJSON(path);
}

function get(app) {
	if (!app.locals[SETTINGS_KEY]) {
		load(app);
	}
	return app.locals[SETTINGS_KEY];
}

module.exports = {
	load,
	get,
};
