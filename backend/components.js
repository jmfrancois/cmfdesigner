// const cmd = require('node-cmd');
const yeoman = require('yeoman-environment');
const rimraf = require('rimraf');
const Adapter = require('./yoadapter');
const pathLib = require('path');
const getFolders = require('./fs').getFolders;

function getComponents(req, res) {
	console.log(req.query);
	res.json({ components: getFolders(pathLib.join(req.query.path, 'src/app/components'))
		.map(folder => ({ id: folder, name: folder }))
	});
}

function postComponent(req, res) {
	// TODO: call yo talend:react-cmf
	// TODO: update db
	// cmd.get(
    //     'pwd',
    //     function onCommand(err, data, stderr){
	// 		console.log('the current working dir is : ', data);
	// 		res.json({ data });
    //     }
	// );
	//
	const path = req.body.$$path;
	const env = yeoman.createEnv([], {}, new Adapter(req, res));
	env.lookup(function () {
		env.run('talend:react-component');
	});
}

function deleteComponent(req, res) {
	const path = pathLib.join(req.query.path, 'src/apps/components', req.params.id);
	console.log('delete ', path);
	rimraf(path, (foo, bar) => {
		console.log('delete component', foo, bar);
		res.json({ foo, bar });
	});
}

function setup(app) {
	app.get('/api/components', getComponents);
	app.post('/api/components', postComponent);
	app.delete('/api/components/:id', deleteComponent);
}

module.exports = {
	setup,
};
