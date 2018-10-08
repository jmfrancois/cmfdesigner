export default function getCWD(state) {
	return state.cmf.collections.getIn(['apps', 'path']);
}
