const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apps = require('./apps');
const pages = require('./pages');
const components = require('./components');
const props = require('./props');
/* eslint-disable no-console */

console.log(`Current directory: ${process.cwd()}`);
console.log(`Current dirname: ${__dirname}`);

const app = express();
app.locals.apps = {
	path: process.cwd(),
};
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../dist')));
apps.setup(app);
components.setup(app);
pages.setup(app);
props.setup(app);

module.exports = app;
