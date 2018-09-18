import React from 'react';
import { shallow } from 'enzyme';

import Connected from './AddForm.container';

const Container = Connected.WrappedComponent;

describe('Container AddForm', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper.props()).toMatchSnapshot();
	});
});

describe('Connected AddForm', () => {
	it('should connect AddForm', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
	});
});

