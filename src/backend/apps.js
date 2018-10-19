const yeoman = require('yeoman-environment');
const path = require('path');
const fs = require('fs');
const Adapter = require('./yoadapter');

function getApps(req, res) {
	const app = req.app.locals.apps || {};
	if (app.path) {
		const packagePath = path.join(app.path, 'package.json');
		if (fs.existsSync(packagePath)) {
			app.package = JSON.parse(fs.readFileSync(packagePath));
		}
	}
	res.json(app);
}

function postApps(req, res) {
	const env = yeoman.createEnv([], { 'skip-install': true }, new Adapter(req, res));
	env.lookup(() => {
		// eslint-disable-next-line no-console
		console.log('yo talend:react-cmf');
		env.run('talend:react-cmf');
		// eslint-disable-next-line no-param-reassign
		req.app.locals.apps = {
			path: path.join(`${process.cwd()}`, req.body.name),
		};
	});
}

function setup(app) {
	app.get('/api/apps', getApps);
	app.post('/api/apps', postApps);
}

module.exports = {
	setup,
};
