import React from 'react';
import { shallow } from 'enzyme';

import AppSwitcher from './AppSwitcher.component';

describe('AppSwitcher', () => {
	it('should render', () => {
		const wrapper = shallow(
			<AppSwitcher />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
