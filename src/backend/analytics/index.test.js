const path = require('path');
const analyse = require('./index').analyse;

const TEST_ANALYTICS = analyse({ path: path.join(__dirname, './tests') });

function getAnalytics(fileName) {
	const pathToFind = path.join(__dirname, 'tests', fileName);
	return TEST_ANALYTICS.find(analytics => analytics.path === pathToFind);
}

describe('analyse', () => {
	it('should support exports', () => {
		const analytics = getAnalytics('exports.js');
		expect(analytics.export).toMatchSnapshot();
	});
	it('should support imports', () => {
		const analytics = getAnalytics('imports.js');
		expect(analytics.dependencies).toMatchSnapshot();
	});
	it('should support components', () => {
		const analytics = getAnalytics('components.js');
		expect(analytics.components).toMatchSnapshot();
	});
});
