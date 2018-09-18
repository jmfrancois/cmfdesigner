function getPages(req, res) {
	res.json({
		pages: [{
			component: 'Foo',
			componentId: 'default',
			path: '/foo',
		}],
	});
}

function setup(app) {
	app.get('/api/apps/:appId/pages', getPages);
}

module.exports = {
	setup,
};
