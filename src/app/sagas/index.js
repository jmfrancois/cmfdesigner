
import { fork } from 'redux-saga/effects';
import { handleApps } from './handleApps';
import { handleProps } from './handleProps';
import { handleComponents } from './handleComponents';


export default function* main() {
	yield fork(handleApps);
	yield fork(handleComponents);
	yield fork(handleProps);
}
