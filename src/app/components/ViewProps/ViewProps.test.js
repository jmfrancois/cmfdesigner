import React from 'react';
import { shallow } from 'enzyme';

import ViewProps from './ViewProps.component';

describe('ViewProps', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewProps />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
