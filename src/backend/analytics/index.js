const fs = require('fs');
const path = require('path');

const readAllJSON = require('./readAllJSON');
const getBootstrap = require('./getBootstrap');
const getDependencies = require('./getDependencies');
const getExport = require('./getExport');
const getComponents = require('./getComponents');
const parse = require('./parse');

/* eslint-disable no-console */

function getInfo(filePath) {
	const parsed = parse({ path: filePath });
	return {
		path: filePath,
		export: getExport(parsed.ast, filePath),
		...getDependencies(parsed.ast, filePath),
		components: getComponents(parsed.ast),
		bootstrap: getBootstrap(parsed.ast, filePath),
	};
}

function analyse(options) {
	let components = [];
	let list;
	try {
		list = fs.readdirSync(options.path);
	} catch (error) {
		console.error(error.message);
		return components;
	}
	const jsFiles = list.filter(name => name.endsWith('.js'));
	const folders = list.filter(name => name.indexOf('.') === -1).filter(name => name !== 'node_modules');
	jsFiles.forEach(filePath => {
		components.push(getInfo(path.join(options.path, filePath)));
	});
	folders.forEach(folderPath => {
		components = components.concat(analyse({ path: path.join(options.path, folderPath) }));
	});
	if (options.settingsPath) {
		const settings = readAllJSON(options.settingsPath);
		Object.keys(settings).forEach(key => {
			if (Array.isArray(settings[key])) {
				components.push(...settings[key]);
			} else {
				components.push(settings[key]);
			}
		});
	}
	return components;
}

function setup(app) {
	app.get('/api/analytics', (req, res) => {
		res.json(app.locals.analytics);
	});
	app.post('/api/analytics', (req, res) => {
		// eslint-disable-next-line no-param-reassign
		app.locals.analytics = analyse({
			path: path.join(req.app.locals.apps.path, 'src/app'),
			settingsPath: path.join(req.app.locals.apps.path, 'src/settings'),
		});
		res.json(app.locals.analytics);
	});
}

module.exports = {
	analyse,
	setup,
};
