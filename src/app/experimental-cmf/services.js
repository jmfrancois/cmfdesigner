import { select, put } from 'redux-saga/effects';

const data = {
	services: {},
	inComponent: {},
	inSaga: {},
	inSelector: {},
};

function get(id) {
	return data.services[id];
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

function getOriginalKey(serviceId, key) {
	return key.replace(getKeyPrefix(serviceId), '');
}


function getInComponent(mod) {
	// eslint-disable-next-line no-param-reassign
	return props => {
		const extendedModule = {};
		Object.keys(mod.actionCreators).forEach(key => {
			// eslint-disable-next-line no-param-reassign
			extendedModule[key] = (...args) => props.dispacthActionCreator(key, ...args);
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
				const shortKey = getOriginalKey(id, key);
				// eslint-disable-next-line no-param-reassign
				inSagaModule[shortKey] = function* execActionCreators(...args) {
					yield put(mod.actionCreators[key], ...args);
				};
			});
			Object.keys(mod.selectors || {}).forEach(key => {
				const selector = mod.selectors[key];
				// eslint-disable-next-line no-param-reassign
				if (inSagaModule[key]) {
					throw new Error(`${key} is used for selector and actioncreators`);
				}
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
	// const config = { id: `service-${serviceId}`, ...value };
	// ==== create cmfModule ===
	const config = {};
	config.id = `service-${serviceId}`;
	config.actionCreators = privatize(value.actionCreators, serviceId);
	config.expressions = privatize(value.expressions, serviceId);
	config.sagas = privatize(value.sagas, serviceId);

	// register service
	data.services[serviceId] = {
		inComponent: getInComponent(value, serviceId),
		inSaga: getInSaga(value, serviceId),
		inSelector: () => value.selectors || {},
	};
	return config;
}

export default {
	get,
	register,
};
