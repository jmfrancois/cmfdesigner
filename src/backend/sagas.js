// const SAGAS_REGEXP = /\/sagas\/|sagas\.js/;

function getSagas(req, res) {
	res.json(
		req.app.locals.analytics.reduce((acc, item) => {
			// if (!item.path.match(SAGAS_REGEXP)) {
			// 	return acc;
			// }
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
