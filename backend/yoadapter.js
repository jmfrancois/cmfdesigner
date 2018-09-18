const log = require('yeoman-environment/lib/util/log');

function Adapter(req, res) {
	this.req = req;
	this.res = res;
}

Adapter.prototype.prompt = function prompt(questions) {
	console.log(this.req.body, { questions });
	this.res.json({ questions });
	return new Promise(resolve => {
		resolve(this.req.body);
	});
};

Adapter.prototype.diff = function diff(actual, expected) {
	this.res.json({ actual, expected });
};

Adapter.prototype.log = log();

module.exports = Adapter;
