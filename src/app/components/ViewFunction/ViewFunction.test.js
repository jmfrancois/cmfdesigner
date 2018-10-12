import React from 'react';
import { shallow } from 'enzyme';

import ViewFunction from './ViewFunction.component';

describe('ViewFunction', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewFunction.WrappedComponent />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
