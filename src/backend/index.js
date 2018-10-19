const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const analytics = require('./analytics');
const apps = require('./apps');
const components = require('./components');
const expressions = require('./expressions');
const logs = require('./logs');
const props = require('./props');
const routes = require('./routes');
const sagas = require('./sagas');
const open = require('./open');
const update = require('./update');

update.warnIfNotLast();
/* eslint-disable no-console */

console.log(`Current directory: ${process.cwd()}`);
console.log(`Current dirname: ${__dirname}`);

const app = express();
app.locals.apps = {
	path: process.cwd(),
};
// find package.json
app.use((req, res, next) => {
	if (!app.locals.analytics) {
		console.log('start analytics ...');
		app.locals.analytics = analytics.analyse({
			path: path.join(req.app.locals.apps.path, 'src/app'),
			settingsPath: path.join(req.app.locals.apps.path, 'src/settings'),
		});
		console.log('analytics done');
	}
	next();
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../dist')));
analytics.setup(app);
apps.setup(app);
components.setup(app);
expressions.setup(app);
logs.setup(app);
props.setup(app);
update.setup(app);
routes.setup(app);
sagas.setup(app);
open.setup(app);

module.exports = app;
