import React from 'react';
import { shallow } from 'enzyme';

import WorkingDirectory from './WorkingDirectory.component';

describe('WorkingDirectory', () => {
	it('should render', () => {
		const wrapper = shallow(
			<WorkingDirectory />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
