// const cmd = require('node-cmd');
const yeoman = require('yeoman-environment');
const Adapter = require('./yoadapter');


function getComponents(req, res) {
	res.json({
		components: [
			{
				name: "SelectionList",
				id: "apps",
				props: {
					saga: {
						id: "loadResource",
						args: [
							{
								id: "apps",
								url: "/api/apps",
								method: "get"
							}
						]
					},
					title: "Apps",
					itemsExpression: {
						id: "cmf.collections.get",
						args: ["apps.apps", []]
					},
					onClickActionCreator: "onClickSelectionListItem"
				}
			},
			{
				name: "SelectionList",
				id: "components",
				props: {
					saga: "handleComponents",
					title: "Components",
					itemsExpression: {
						id: "cmf.collections.get",
						args: ["components.components", []]
					}
				}
			}
		]
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
	const env = yeoman.createEnv([], {}, new Adapter(req, res));
	env.lookup(function () {
		env.run('talend:react-component');
	});
}

function setup(app) {
	app.get('/api/components', getComponents);
	app.post('/api/components', postComponent);
}

module.exports = {
	setup,
};
