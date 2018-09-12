const log = require('yeoman-environment/lib/util/log');

function Adapter(req, res) {
	this.req = req;
	this.res = res;
}

Adapter.prototype.prompt = function prompt(questions, callback) {
	console.log(this.req.body, { questions });
	this.res.json({ questions });
	return new Promise((resolve, reject) => {
		resolve(this.req.body);
	});
	// questions.reduce((acc, question) => {
	// 	req.body[question.name]
	// }, {})
	/**
	 * [ { type: 'input',
       name: 'name',
       message: 'name',
       validate: [Function: validate] },
     { type: 'confirm',
       name: 'isFull',
       message: 'full component (component + container + connect)',
       default: false },
     { type: 'list',
       name: 'type',
       message: 'type',
       default: 'es6.class',
       choices: [Array],
       when: [Function: when] },
     { type: 'input',
       name: 'purePath',
       message: 'pure component import path',
       default: 'react-talend-components',
       when: [Function: when] },
     { type: 'confirm',
       name: 'css',
       message: 'css',
       default: [Function: default],
       when: [Function: when] },
     { type: 'input',
       name: 'path',
       message: 'path',
       default: 'src/app/components' } ]
	 */
	// callback(this.req.body);
};

Adapter.prototype.diff = function (actual, expected) {
	debugger; this;
	process.send({
		event: 'generator:diff',
		data: {
			actual,
			expected,
		},
	});
};

Adapter.prototype.log = log();

module.exports = Adapter;
