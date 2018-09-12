import React from 'react';
import { shallow } from 'enzyme';

import ViewComponent from './ViewComponent.component';

describe('ViewComponent', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewComponent />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
