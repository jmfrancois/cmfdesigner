import React from 'react';
import { shallow } from 'enzyme';

import ViewSaga from './ViewSaga.component';

describe('ViewSaga', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewSaga />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
