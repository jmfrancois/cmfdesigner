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
		expect(analytics.dependencies.length).toBe(4);
		// import defaultFromExternal, { namedFromExternal } from 'external';
		expect(analytics.dependencies[0]).toEqual({
			default: true,
			isLocal: false,
			name: 'defaultFromExternal',
			source: 'external',
		});
		expect(analytics.dependencies[1]).toEqual({
			default: false,
			isLocal: false,
			name: 'namedFromExternal',
			source: 'external',
		});
		// import defaultFromLocal, { namedFromLocal } from './local';
		expect(analytics.dependencies[2]).toMatchObject({
			default: true,
			isLocal: true,
			name: 'defaultFromLocal',
			source: './local',
		});
		expect(analytics.dependencies[3]).toMatchObject({
			default: false,
			isLocal: true,
			name: 'namedFromLocal',
			source: './local',
		});
		expect(analytics.dependencies[2].path.endsWith('/src/backend/analytics/tests/local.js')).toBe(true);
		expect(analytics.dependencies[3].path.endsWith('/src/backend/analytics/tests/local.js')).toBe(true);
	});
	it('should support components', () => {
		const analytics = getAnalytics('components.js');
		expect(analytics.components.length).toBe(2);
		expect(analytics.components[0]).toEqual({
			displayName: 'StateFullInternalComponent',
			name: 'StateFullInternalComponent',
			propTypes: true,
			type: 'class',
		});
		expect(analytics.components[1]).toEqual({
			displayName: 'PureFnInternalComponent',
			name: 'PureFnInternalComponent',
			propTypes: true,
			type: 'function',
		});
		expect(analytics.components).toMatchSnapshot();
	});
});
