const pathLib = require('path');
const fs = require('./fs');

const PROPS_KEY = 'cmf-settings';

function loadProps(app) {
	const path = pathLib.join(app.locals.apps.path, 'src/settings/');
	// eslint-disable-next-line no-param-reassign
	app.locals[PROPS_KEY] = fs.readAllJSON(path);
}

function getProps(req, res) {
	if (!req.app.locals[PROPS_KEY]) {
		loadProps(req.app);
	}
	res.json({ data: req.app.locals[PROPS_KEY] });
}

function postProps(req, res) {
	loadProps(req.app);
	res.json({ data: req.app.locals[PROPS_KEY] });
}

function setup(app) {
	app.get('/api/props', getProps);
	app.post('/api/props', postProps);
}

module.exports = {
	setup,
};
