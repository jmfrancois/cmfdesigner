import React from 'react';
import { shallow } from 'enzyme';

import Null from './Null.component';

describe('Null', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Null />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
