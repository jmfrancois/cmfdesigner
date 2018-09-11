import React from 'react';
import { shallow } from 'enzyme';

import SelectionList from './SelectionList.component';

describe('SelectionList', () => {
	it('should render', () => {
		const wrapper = shallow(
			<SelectionList />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
