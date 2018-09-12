import React from 'react';
import { shallow } from 'enzyme';

import AddComponentForm from './AddComponentForm.component';

describe('AddComponentForm', () => {
	it('should render', () => {
		const wrapper = shallow(
			<AddComponentForm />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
