import React from 'react';
import { shallow } from 'enzyme';

import AppSwitcher from './AppSwitcher.component';

describe('AppSwitcher', () => {
	it('should render', () => {
		const wrapper = shallow(<AppSwitcher.WrappedComponent cwd="/Users/foo/github/test" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
