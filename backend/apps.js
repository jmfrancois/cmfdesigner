const yeoman = require('yeoman-environment');
const Adapter = require('./yoadapter');

function getApps(req, res) {
	res.json(req.app.locals.apps || {});
}

function postApps(req, res) {
	const env = yeoman.createEnv([], { 'skip-install': true }, new Adapter(req, res));
	env.lookup(() => {
		console.log('yo talend:react-cmf');
		env.run('talend:react-cmf');
	});
}

function setup(app) {
	app.get('/api/apps', getApps);
	app.post('/api/apps', postApps);
}

module.exports = {
	setup,
};
