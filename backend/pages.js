function getPages(req, res) {
	res.json({
		pages: [],
	});
}

function postPages(req, res) {
	res.json({});
}

function setup(app) {
	app.get('/api/pages', getPages);
	app.post('/api/pages', postPages);
}

module.exports = {
	setup,
};
