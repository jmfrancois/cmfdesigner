

function get(req, res) {
	res.json(
		req.app.locals.analytics.filter(analytics => analytics.type === 'routes')
	);
}

function setup(app) {
	app.get('/api/routes', get);
}

module.exports = {
	setup,
};
