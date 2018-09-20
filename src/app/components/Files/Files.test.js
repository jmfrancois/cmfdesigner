import React from 'react';
import { shallow } from 'enzyme';

import Files from './Files.component';

describe('Files', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Files.WrappedComponent />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
