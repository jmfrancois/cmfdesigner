/* eslint-disable */
import dep from 'dep';

export { local } from './local';

export function fn(param1, { deconstructed }, ...rest) {

}

export class Foo {
	static staticVar = 'static';
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
