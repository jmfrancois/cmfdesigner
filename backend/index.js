const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const apps = require('./apps');
const pages = require('./pages');
const components = require('./components');
const props = require('./props');

const app = express();
app.use(session({
	secret: 'what a secret',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true },
}));
app.use(bodyParser.json());
app.use(express.static('dist'));
apps.setup(app);
components.setup(app);
pages.setup(app);
props.setup(app);
app.listen(3030, () => console.log('Example app listening on port 3030!'));
