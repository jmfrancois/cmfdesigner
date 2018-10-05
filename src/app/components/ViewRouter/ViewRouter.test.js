import React from 'react';
import { shallow } from 'enzyme';

import ViewRouter from './ViewRouter.component';

describe('ViewRouter', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewRouter.WrappedComponent />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
