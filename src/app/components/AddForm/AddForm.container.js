import React from 'react';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';
import Form from '@talend/react-forms';


class AddForm extends React.Component {
	static displayName = 'AddForm';
	static propTypes = {
		...cmfConnect.propTypes,
	};

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(event, data) {
		this.props.dispatch({
			type: AddForm.ACTION_TYPE_SUBMIT,
			componentId: this.props.componentId,
			data,
		});
	}

	render() {
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS));
		return (
			<div>
				<h1>{props.title || 'Add Form'}</h1>
				<p>{props.description}</p>
				<Form {...props} onSubmit={this.onSubmit} />
			</div>
		);
	}
}

AddForm.ACTION_TYPE_SUBMIT = 'ADD_FORM_SUBMIT';
export default cmfConnect({})(AddForm);
