import React from 'react';
import { shallow } from 'enzyme';

import ViewFile from './ViewFile.component';

describe('ViewFile', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewFile />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
