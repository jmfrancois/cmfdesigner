import React from 'react';
import { shallow } from 'enzyme';

import PanelExports from './PanelExports.component';

describe('PanelExports', () => {
	it('should render', () => {
		const wrapper = shallow(
			<PanelExports />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
