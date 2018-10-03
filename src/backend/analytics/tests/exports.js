/* eslint-disable */
import dep from 'dep';

export { local } from './local';

export function Func(param1, { deconstructed }, ...rest) {

}
Func.propTypes = {}
Func.displayName = 'function';

export class Foo extends React.Component {
	static displayName = 'Foo';
	static propTypes = {};
}

export const constant = 'CONSTANT';

class Internal {}

function fnInternal(param1, { deconstructed }, ...rest) {}

function* fnstar() {}

export default {
	dep,
	fnInternal,
	Internal,
	fnstar,
	objectMethod(foo, { bar }, ...rest) {

	},
};
