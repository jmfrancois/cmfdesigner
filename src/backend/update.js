const https = require('https');
const version = require('../../package.json').version;
/* eslint-disable no-console */

const INFO = {};

function getInfo() {
	if (INFO.data) {
		return new Promise(resolve => {
			resolve(INFO.data);
		});
	}
	return new Promise((resolve, reject) => {
		https.get('https://registry.npmjs.org/@talend/cmf-designer', resp => {
			let data = '';
			resp.on('data', chunk => {
				data += chunk;
			});
			resp.on('end', () => {
				INFO.data = JSON.parse(data);
				resolve(INFO.data);
			});
		})
		.on('error', err => {
			reject(err);
		});
	});
}

function warnIfNotLast() {
	getInfo().then(infos => {
		if (infos['dist-tags'].latest !== version) {
			console.warn(`WARNING: You use @talend/cmf-designer@${version} latest version is: ${infos['dist-tags'].latest}`);
		}
	});
}

function setup(app) {
	app.get('/api/info', (req, res) => {
		getInfo().then(info => {
			res.json(info);
		}, error => {
			res.status(500).json(error);
		});
	});
}

module.exports = {
	getInfo,
	warnIfNotLast,
	setup,
};
