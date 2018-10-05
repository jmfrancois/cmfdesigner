import cmf from "@talend/react-cmf";


// High level API
export function* inSaga() {
	const mystuff = cmf.services.get('mystuff').inSaga();
	yield mystuff.fetchAll();  // will dispatch it and the main saga treat it
	yield mystuff.getAll(); // will select it
}

export function MyComponent(props) {
	const mystuff = cmf.services.get('mystuff').inComponent(props);
	mystuff.fetchAll(); // will dispatch it
	mystuff.getAll(); // throw Exception
}

export function myExpression({ context }) {
	const mystuff = cmf.services.get('mystuff').inExpression(context);
	mystuff.fetchAll(); // throw
	mystuff.getAll();
}

// Low level API
const mystuff = cmf.services.get('mystuff');
const action = mystuff.actionCreators.fetchAll();

function mapStateToProps(state) {
	const components = mystuff.selectors.getAll(state);
}
