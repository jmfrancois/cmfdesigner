/**
 * response with all functions with 'generator' into exports of analytics
 */
function getSagas(req, res) {
	res.json(
		req.app.locals.analytics.reduce((acc, item) => {
			if (item.export.length > 0) {
				return item.export.reduce((subacc, exp) => {
					if (exp.type === 'function' && exp.generator) {
						subacc.push({
							...exp,
							id: item.path,
							path: item.path,
						});
					}
					return subacc;
				}, acc);
			}
			return acc;
		}, [])
	);
}


function setup(app) {
	app.get('/api/sagas', getSagas);
}

module.exports = {
	setup,
};
