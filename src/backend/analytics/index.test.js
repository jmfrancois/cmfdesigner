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
					required: false,
					type: 'array',
				},
				optionalArrayOf: {
					required: false,
					type: 'arrayOf',
				},
				optionalBool: {
					required: false,
					type: 'bool',
				},
				optionalElement: {
					required: false,
					type: 'element',
				},
				optionalEnum: {
					required: false,
					type: 'oneOf',
				},
				optionalFunc: {
					required: false,
					type: 'func',
				},
				optionalNode: {
					required: false,
					type: 'node',
				},
				optionalNumber: {
					required: false,
					type: 'number',
				},
				optionalObject: {
					required: false,
					type: 'object',
				},
				optionalObjectOf: {
					required: false,
					type: 'objectOf',
				},
				optionalObjectWithShape: {
					required: false,
					type: 'shape',
				},
				optionalString: {
					required: false,
					type: 'string',
				},
				optionalSymbol: {
					required: false,
					type: 'symbol',
				},
				optionalUnion: {
					required: false,
					type: 'oneOfType',
				},
				requiredAny: {
					required: true,
					type: 'any',
				},
				requiredFunc: {
					required: true,
					type: 'func',
				},
			},
		});
		expect(analytics.components).toMatchSnapshot();
	});
});
