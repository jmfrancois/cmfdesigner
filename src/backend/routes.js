const settings = require('./settings');

function get(req, res) {
	res.json({ data: settings.get(req.app).routes });
}

function setup(app) {
	app.get('/api/routes', get);
}

module.exports = {
	setup,
};
