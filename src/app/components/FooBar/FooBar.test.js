import React from 'react';
import { shallow } from 'enzyme';

import FooBar from './FooBar.component';

describe('FooBar', () => {
	it('should render', () => {
		const wrapper = shallow(
			<FooBar />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
