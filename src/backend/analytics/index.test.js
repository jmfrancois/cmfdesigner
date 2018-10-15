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
		expect(
			analytics.dependencies[2].path.endsWith(
				'/src/backend/analytics/tests/local.js'
			)
		).toBe(true);
		expect(
			analytics.dependencies[3].path.endsWith(
				'/src/backend/analytics/tests/local.js'
			)
		).toBe(true);
	});
	it('should support components', () => {
		const analytics = getAnalytics('components.js');
		expect(analytics.components.length).toBe(2);
		expect(analytics.components[0]).toEqual({
			displayName: 'StateFullInternalComponent',
			name: 'StateFullInternalComponent',
			hasPropTypes: true,
			propTypes: {},
			type: 'class',
		});
		expect(analytics.components[1]).toEqual({
			displayName: 'PureFnInternalComponent',
			name: 'PureFnInternalComponent',
			hasPropTypes: true,
			type: 'function',
			propTypes: {
				optionalArray: {
					requried: false,
					type: 'array',
				},
				optionalArrayOf: {
					requried: false,
					type: 'arrayOf',
				},
				optionalBool: {
					requried: false,
					type: 'bool',
				},
				optionalElement: {
					requried: false,
					type: 'element',
				},
				optionalEnum: {
					requried: false,
					type: 'oneOf',
				},
				optionalFunc: {
					requried: false,
					type: 'func',
				},
				optionalNode: {
					requried: false,
					type: 'node',
				},
				optionalNumber: {
					requried: false,
					type: 'number',
				},
				optionalObject: {
					requried: false,
					type: 'object',
				},
				optionalObjectOf: {
					requried: false,
					type: 'objectOf',
				},
				optionalObjectWithShape: {
					requried: false,
					type: 'shape',
				},
				optionalString: {
					requried: false,
					type: 'string',
				},
				optionalSymbol: {
					requried: false,
					type: 'symbol',
				},
				optionalUnion: {
					requried: false,
					type: 'oneOfType',
				},
				requiredAny: {
					requried: true,
					type: 'any',
				},
				requiredFunc: {
					requried: true,
					type: 'func',
				},
			},
		});
		expect(analytics.components).toMatchSnapshot();
	});
});
