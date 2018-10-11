
function get(req, res) {
	res.json(
		req.app.locals.analytics.filter(analytics => analytics.type === 'props')
	);
}

function setup(app) {
	app.get('/api/props', get);
}

module.exports = {
	setup,
};
