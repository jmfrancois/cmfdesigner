import React from 'react';
import { shallow } from 'enzyme';

import ViewComponent from './ViewComponent.component';

describe('ViewComponent', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewComponent.WrappedComponent />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
