const pathLib = require('path');
const opn = require('opn');
const fs = require('./fs');

function getProps(req, res) {
	const path = pathLib.join(fs.getCWD(req), 'src/settings/');
	res.json({ data: fs.readAllJSON(path) });
}

function openProps(req, res) {
	const path = pathLib.join(fs.getCWD(req), 'src/settings/', req.body.filename);
	if (fs.exists(path)) {
		opn(path);
		res.json({});
	} else {
		res.status(500).json({
			error: `can t open ${path} doesnt exists`,
		});
	}
}

function setup(app) {
	app.get('/api/props', getProps);
	app.post('/api/props/open', openProps);
}

module.exports = {
	setup,
};
