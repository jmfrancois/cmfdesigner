import React from 'react';
import { shallow } from 'enzyme';

import ViewPropTypes from './ViewPropTypes.component';

describe('ViewPropTypes', () => {
	it('should render', () => {
		const data = { foo: { type: 'string', isRequired: true } };
		const wrapper = shallow(
			<ViewPropTypes.WrappedComponent data={data} />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
