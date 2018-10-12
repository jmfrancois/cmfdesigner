import React from 'react';
import { shallow } from 'enzyme';

import ViewLogs from './ViewLogs.component';

describe('ViewLogs', () => {
	it('should render', () => {
		const logs = [
			{ path: '/foo', level: 'error', code: 0 },
			{ path: '/extra', level: 'error', code: 1 },
		];
		const wrapper = shallow(
			<ViewLogs.WrappedComponent file={{ path: '/foo' }} logs={logs} />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
