import React from 'react';
import { shallow } from 'enzyme';

import ViewFunctionParam from './ViewFunctionParam.component';

describe('ViewFunctionParam', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewFunctionParam />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
