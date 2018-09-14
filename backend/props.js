const pathLib = require('path');
const fs = require('./fs');

function getProps(req, res) {
	const path = pathLib.join(fs.getCWD(req), 'src/settings/');
	res.json({ data: fs.readAllJSON(path) });
}

function setup(app) {
	app.get('/api/props', getProps);
}

module.exports = {
	setup,
};
