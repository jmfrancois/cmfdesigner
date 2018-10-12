

function get(req, res) {
	res.json(
		req.app.locals.analytics.reduce((acc, item) => {
			if (!item.logs) {
				return acc;
			}
			if (item.logs.length === 0) {
				return acc;
			}
			return item.logs.reduce((subacc, log) => {
				subacc.push({
					...log,
					id: `${item.path}#${item.target}`,
					name: item.path.split('/').pop(),
					path: item.path,
				});
				return subacc;
			}, acc);
		}, [])
	);
}

function setup(app) {
	app.get('/api/logs', get);
}

module.exports = {
	setup,
};
