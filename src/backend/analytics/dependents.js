
function get(current, all) {
	const path = current.path;
	return all.filter(f => f.path !== path).reduce(
		(acc, item) => acc.concat(
			(item.dependencies || [])
				.filter(source => source.path === path)
				.map(() => item.path)
		), []
	);
}
module.exports = {
	get,
};
