const EXPRESSION_REGEXP = /\/expressions\/|expressions\.js/;

/**
 * response with all functions under an 'expressions' folder
 * or 'expressions.js' file.
 * An expression is just a function so it s very hard to find them.
 * This is why this first version find them by convention.
 * We can do better by analysis the bootstrap of the app
 */
function getExpressions(req, res) {
	res.json(
		req.app.locals.analytics.reduce((acc, item) => {
			if (!item.path.match(EXPRESSION_REGEXP)) {
				return acc;
			}
			if (item.export.length > 0) {
				return item.export.reduce((subacc, exp) => {
					if (exp.type === 'function') {
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
	app.get('/api/expressions', getExpressions);
}

module.exports = {
	setup,
};
