const yeoman = require('yeoman-environment');
const Adapter = require('./yoadapter');

function getApps(req, res) {
	res.json(req.app.locals.apps || {});
}

function putApps(req, res) {
	// eslint-disable-next-line no-param-reassign
	req.app.locals.apps = req.body;
	res.json({});
}

function postApps(req, res) {
	const cwd = req.body.path;
	console.log(`yo talend:react-cmf in ${cwd}`);
	const env = yeoman.createEnv([], { cwd }, new Adapter(req, res));
	env.lookup(() => {
		env.run('talend:react-cmf');
	});
}

function setup(app) {
	app.get('/api/apps', getApps);
	app.put('/api/apps', putApps);
	app.post('/api/apps', postApps);
}

module.exports = {
	setup,
};
