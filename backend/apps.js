function getApps(req, res) {
	res.json(req.app.locals.apps);
}

function postApps(req, res) {
	// eslint-disable-next-line no-param-reassign
	req.app.locals.apps = req.body;
	res.json({});
}

function setup(app) {
	app.get('/api/apps', getApps);
	app.post('/api/apps', postApps);
}

module.exports = {
	setup,
};
