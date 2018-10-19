const order = require('./order');

const SAGA_REGEXP = /\/saga\/|sagas\.js/;

/**
 * response with all functions with 'generator' into exports of analytics
 */
function getSagas(req, res) {
	res.json(
		req.app.locals.analytics.reduce((acc, item) => {
			if (item.path.endsWith('.json')) {
				return acc;
			}
			if (item.export.length > 0) {
				return item.export.reduce((subacc, exp) => {
					if (!item.path.match(SAGA_REGEXP)) {
						return acc;
					}
					if (exp.type === 'function' && exp.generator) {
						subacc.push({
							...exp,
							id: `${item.path}#${exp.name}`,
							path: item.path,
						});
					} else if (exp.type === 'object') {
						Object.keys(exp.properties).forEach(key => {
							// if (exp.properties[key].type === 'function')
							subacc.push({
								id: `${item.path}#${key}`,
								path: item.path,
								...exp.properties[key],
							});
						});
					}
					return subacc;
				}, acc);
			}
			return acc;
		}, []).sort(order)
	);
}


function setup(app) {
	app.get('/api/sagas', getSagas);
}

module.exports = {
	setup,
};
