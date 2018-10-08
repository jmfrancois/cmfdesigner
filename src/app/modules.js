import { select } from 'redux-saga/effects';
import cmf from '@talend/react-cmf';
import omit from 'lodash/omit';

const data = {
	modules: {},
	inComponent: {},
	inSaga: {},
	inSelector: {},
};

function get(id) {
	return data.modules[id];
}

function getKeyPrefix(serviceId) {
	return `service#${serviceId}:`;
}

function privatize(config = {}, serviceId) {
	const PREFIX = getKeyPrefix(serviceId);
	return Object.keys(config).reduce((acc, key) => {
		// eslint-disable-next-line no-param-reassign
		acc[`${PREFIX}${key}`] = config[key];
		return acc;
	}, {});
}

function getShortKey(serviceId, key) {
	return key.replace(getKeyPrefix(serviceId), '');
}


function getInComponent(mod) {
	// eslint-disable-next-line no-param-reassign
	return props => {
		const extendedModule = {};
		Object.keys(mod.actionCreators).forEach(key => {
			// eslint-disable-next-line no-param-reassign
			mod[key] = (...args) => props.dispacthActionCreator(key, ...args);
		});
		return extendedModule;
	};
}

function getInSaga(mod, id) {
	// eslint-disable-next-line no-param-reassign
	return () => {
		if (!data.inSaga[id]) {
			const inSagaModule = {};
			Object.keys(mod.actionCreators || {}).forEach(key => {
				const shortKey = getShortKey(id, key);
				// eslint-disable-next-line no-param-reassign
				inSagaModule[shortKey] = function* execActionCreators(...args) {
					yield cmf.sagas.putActionCreator(key, ...args);
				};
			});
			Object.keys(mod.selectors || {}).forEach(key => {
				const selector = mod.selectors[key];
				// eslint-disable-next-line no-param-reassign
				inSagaModule[key] = function* execSelector(...args) {
					if (args.length === 0) {
						return yield select(selector);
					}
					const state = yield select();
					return selector(state, ...args);
				};
			});
			data.inSaga[id] = inSagaModule;
		}
		return data.inSaga[id];
	};
}

function register(serviceId, value) {
	// const mod = Object.assign({}, value);
	const config = { ...value };
	config.actionCreators = privatize(value.actionCreators, serviceId);
	config.expressions = privatize(value.expressions, serviceId);
	config.sagas = privatize(value.sagas, serviceId);
	data.modules[serviceId] = {
		...config,
		inComponent: getInComponent(config, serviceId),
		inSaga: getInSaga(config, serviceId),
		inSelector: () => value.selectors || {},
	};
	return omit(config, ['selectors']); // to register all the things in private way
}

export default {
	get,
	register,
};
