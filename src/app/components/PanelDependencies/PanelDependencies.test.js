import React from 'react';
import { shallow } from 'enzyme';

import PanelDependencies from './PanelDependencies.component';

describe('PanelDependencies', () => {
	it('should render', () => {
		const wrapper = shallow(
			<PanelDependencies />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
