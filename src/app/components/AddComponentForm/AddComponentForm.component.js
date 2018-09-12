import React from 'react';
import PropTypes from 'prop-types';
import Form from '@talend/react-forms';
import { cmfConnect } from '@talend/react-cmf';

const ADD_COMPONENT_FORM_SCHEMA = {
	jsonSchema: {
		title: 'Add component form',
		type: 'object',
		required: [
			'name',
		],
		properties: {
			name: {
				type: 'string',
				title: 'Name',
			},
			isFull: {
				type: 'boolean',
				title: 'isFull',
			},
			type: {
				type: 'string',
				title: 'type',
				enum: ['es6.class', 'es6.arrow', 'stateless', 'connect'],
			},
			// purePath
			css: {
				type: 'boolean',
				title: 'css',
			},
			path: {
				type: 'string',
				title: 'Path',
			},
		},
	},
	uiSchema: [
		{
			key: 'name',
		},
		{
			key: 'isFull',
		},
		{
			key: 'type',
			widget: 'datalist',
			titleMap: [
				{
					name: 'ES6 class aka stateful',
					value: 'es6.class',
				},
				{
					name: 'ES6 arrow aka stateless',
					value: 'es6.arrow',
				},
				{
					name: 'function aka stateless',
					value: 'stateless',
				},
				{
					name: 'CMFConnect',
					value: 'connect',
				},
			],
		},
	],
	properties: {
		id: 'default',
		isFull: false,
		type: 'es6.class',
		css: false,
		path: 'src/app/components',
	},
};

class AddComponentForm extends React.Component {

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(event, data) {
		this.props.dispatch({
			type: AddComponentForm.ACTION_TYPE_SUBMIT,
			data,
		});
	}

	render() {
		return (
			<div>
				<h1>Add Component form</h1>
				<p>To add a component the backend use the following command</p>
				<pre>yo talend:react-component</pre>
				<Form data={ADD_COMPONENT_FORM_SCHEMA} onSubmit={this.onSubmit} />
			</div>
		);
	}
}

AddComponentForm.propTypes = {
	...cmfConnect.propTypes,
};
AddComponentForm.ACTION_TYPE_SUBMIT = 'AddComponentForm#sumbit';

export default cmfConnect({})(AddComponentForm);
