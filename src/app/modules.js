import { put } from 'redux-saga/effects';

const data = {
	modules: {},
	inComponent: {},
	inSaga: {},
	inSelector: {},
};

function get(id) {
	return data.modules[id];
}

function addInComponent(mod) {
	// eslint-disable-next-line no-param-reassign
	mod.inComponent = props => {
		const extendedModule = {};
		Object.keys(mod.actionCreators).forEach(key => {
			// eslint-disable-next-line no-param-reassign
			mod[key] = (...args) => props.dispacth(mod.actionCreators[key](...args));
		});
		return extendedModule;
	};
}

function addInSaga(mod, id) {
	// eslint-disable-next-line no-param-reassign
	mod.inSaga = () => {
		if (!data.inSaga[id]) {
			const inSagaModule = {};
			Object.keys(mod.actionCreators).forEach(key => {
				// eslint-disable-next-line no-param-reassign
				inSagaModule[key] = function* execActionCreators(...args) {
					yield put(mod.actionCreators[key](...args));
				};
			});
			data.inSaga[id] = inSagaModule;
		}
		return data.inSaga[id];
	};
}

function addInSelector(mod) {
	// eslint-disable-next-line no-param-reassign
	mod.inSelector = () => mod.selectors;
}

function register(id, value) {
	const mod = Object.assign({}, value);
	data.modules[id] = mod;
	addInComponent(mod, id);
	addInSaga(mod, id);
	addInSelector(mod, id);
}

export default {
	get,
	register,
};
