import React from 'react';
import { shallow } from 'enzyme';

import ViewLogs from './ViewLogs.component';

describe('ViewLogs', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewLogs />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
