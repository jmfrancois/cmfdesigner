import getComponents from '../selectors/getComponents';

export default function isWebapp(args) {
	return getComponents(args).size > 0;
}
