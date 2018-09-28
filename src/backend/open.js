const fs = require('fs');
const opn = require('opn');

/**
 * call opn with the given path.
 * So the system must be configured to support extensions like js and json
 */
function open(req, res) {
	if (fs.existsSync(req.body.path)) {
		opn(req.body.path, { wait: false }).then(
			() => res.json({})
		).catch(error => {
			res.status(500).json({ error: { message: error.message } });
		});
	} else {
		res.status(500).json({
			error: `${req.body.path} doesnt exists`,
		});
	}
}

function setup(app) {
	app.post('/api/open', open);
}

module.exports = {
	setup,
};
