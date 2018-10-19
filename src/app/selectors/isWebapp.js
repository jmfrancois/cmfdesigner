export default function isWebapp(state) {
	return !!state.cmf.collections.getIn(['apps', 'package', 'name']);
}
