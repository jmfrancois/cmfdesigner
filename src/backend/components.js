const yeoman = require('yeoman-environment');
const rimraf = require('rimraf');
const Adapter = require('./yoadapter');
const pathLib = require('path');
const fs = require('./fs');
const order = require('./order');
/* eslint-disable no-console */

function getComponents(req, res) {
	res.json(
		req.app.locals.analytics.reduce((acc, item) => {
			if (item.path.endsWith('.json')) {
				return acc;
			}
			if (item.components.length > 0) {
				item.components.reduce((subacc, component) => {
					subacc.push({
						...component,
						id: `${item.path}#${component.name}`,
						path: item.path,
						analytics: item,
					});
					return subacc;
				}, acc);
			}
			if (item.export) {
				item.export.filter(exp => exp.isComponent).reduce((subacc, exp) => {
					subacc.push({
						...exp,
						id: `${item.path}#${exp.name}`,
						path: item.path,
						analytics: item,
					});
					return subacc;
				}, acc);
			}
			return acc;
		}, []).sort(order)
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
