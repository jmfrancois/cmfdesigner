const fs = require('fs');
const path = require('path');

const getDependencies = require('./getDependencies');
const getExport = require('./getExport');
const getComponents = require('./getComponents');
const parse = require('./parse');

/* eslint-disable no-console */

function getInfo(filePath) {
	const parsed = parse({ path: filePath });
	return {
		path: filePath,
		export: getExport(parsed.ast),
		...getDependencies(parsed.ast, filePath),
		components: getComponents(parsed.ast),
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
	return components;
}

function setup(app) {
	app.get('/api/analytics', (req, res) => {
		res.json(analyse({ path: path.join(req.app.locals.apps.path, 'src/app') }));
	});
}

module.exports = {
	analyse,
	setup,
};
