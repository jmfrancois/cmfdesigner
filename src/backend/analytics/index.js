const fs = require('fs');
const path = require('path');

const readAllJSON = require('./readAllJSON');
const getBootstrap = require('./getBootstrap');
const getDependencies = require('./getDependencies');
const getExport = require('./getExport');
const getComponents = require('./getComponents');
const parse = require('./parse');
const rules = require('./rules');
const dependents = require('./dependents');

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
	let results = [];
	let list;
	try {
		list = fs.readdirSync(options.path);
	} catch (error) {
		console.error(error.message);
		return results;
	}
	const jsFiles = list.filter(name => name.endsWith('.js'));
	const folders = list.filter(name => name.indexOf('.') === -1).filter(name => name !== 'node_modules');
	jsFiles.forEach(filePath => {
		results.push(getInfo(path.join(options.path, filePath)));
	});
	folders.forEach(folderPath => {
		results = results.concat(analyse({ path: path.join(options.path, folderPath) }));
	});
	if (options.settingsPath) {
		const settings = readAllJSON(options.settingsPath);
		Object.keys(settings).forEach(key => {
			if (Array.isArray(settings[key])) {
				results.push(...settings[key]);
			} else {
				results.push(settings[key]);
			}
		});
	}
	// post process we do a second pass
	results.forEach(current => {
		// eslint-disable-next-line no-param-reassign
		current.dependents = dependents.get(current, results);
		// eslint-disable-next-line no-param-reassign
		current.logs = rules.log(current);
	});
	return results;
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
