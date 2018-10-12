const fs = require('fs');
const pathLib = require('path');

function exists(path) {
	return fs.existsSync(path);
}

function getCWD(req) {
	return req.app.locals.apps && req.app.locals.apps.path;
}

function getFolders(path) {
	const content = fs.readdirSync(path);
	return content.filter(name => fs.lstatSync(pathLib.join(path, name)).isDirectory());
}


module.exports = {
	exists,
	getCWD,
	getFolders,
};
