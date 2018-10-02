const yeoman = require('yeoman-environment');
const rimraf = require('rimraf');
const Adapter = require('./yoadapter');
const pathLib = require('path');
const fs = require('./fs');
/* eslint-disable no-console */

function getComponents(req, res) {
	res.json(
		req.app.locals.analytics.reduce((acc, item) => {
			if (item.components.length > 0) {
				return item.components.reduce((subacc, component) => {
					subacc.push({
						...component,
						id: `${item.path}#${component.name}`,
						path: item.path,
						analytics: item,
					});
					return subacc;
				}, acc);
			}
			return acc;
		}, [])
	);
}

function postComponent(req, res) {
	const cwd = fs.getCWD(req);
	const env = yeoman.createEnv([], { cwd }, new Adapter(req, res));
	env.lookup(() => {
		console.log('yo talend:react-component');
		env.run('talend:react-component');
	});
}

function deleteComponent(req, res) {
	const path = pathLib.join(fs.getCWD(req), 'src/app/components', req.params.id);
	console.log('delete ', path);
	rimraf(path, error => {
		if (error) {
			console.error(error);
			res.status(500).json({ error });
			return;
		}
		res.json({});
	});
}

function setup(app) {
	app.get('/api/components', getComponents);
	app.post('/api/components', postComponent);
	app.delete('/api/components/:id', deleteComponent);
}

module.exports = {
	setup,
};
