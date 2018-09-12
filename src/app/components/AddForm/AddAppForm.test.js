import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from '@talend/react-cmf/lib/mock';
import { Map } from 'immutable';

import Component from './AddAppForm.component';
import Container, { DEFAULT_STATE } from './AddAppForm.container';
import Connected, {
	mapStateToProps,
} from './AddAppForm.connect';

describe('Component AddAppForm', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Component />
		).toJSON();
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Container AddAppForm', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper.props()).toMatchSnapshot();
	});
});

describe('Connected AddAppForm', () => {
	it('should connect AddAppForm', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should mapStateToProps', () => {
		const state = {
			cmf: {
				components: new Map({
					AddAppForm: {
						AddAppForm: DEFAULT_STATE.toJS(),
					},
				}),
			},
		};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
});

