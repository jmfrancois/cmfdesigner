import React from 'react';
import { shallow } from 'enzyme';

import ViewComponent from './ViewComponent.component';

/* global jest */

jest.mock('../../experimental-cmf/modules', () => ({
	get: () => ({
		inComponent: () => ({
			delete: jest.fn(),
		}),
	}),
}));

describe('ViewComponent', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ViewComponent.WrappedComponent />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
