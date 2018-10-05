const settings = require('./settings');

function get(req, res) {
	res.json({ data: settings.get(req.app).props });
}

function setup(app) {
	app.get('/api/props', get);
}

module.exports = {
	setup,
};
