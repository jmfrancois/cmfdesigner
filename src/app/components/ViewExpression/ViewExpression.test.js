import React from 'react';
import { shallow } from 'enzyme';

import ViewExpression from './ViewExpression.component';

describe('ViewExpression', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewExpression />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
