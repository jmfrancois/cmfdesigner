function getApps(req, res) {
	res.json({
		apps: [
			{
				id: 'self',
				name: 'CMF Designer',
			},
		],
	});
}

function setup(app) {
	app.get('/api/apps', getApps);
}

module.exports = {
	setup,
};
