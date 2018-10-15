import React from 'react';
import { shallow } from 'enzyme';

import ViewPropTypes from './ViewPropTypes.component';

describe('ViewPropTypes', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewPropTypes.WrappedComponent data={{}} />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
