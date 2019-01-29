import React from 'react';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';
import Form from '@talend/react-forms';
import theme from './AddForm.scss';

class AddForm extends React.Component {
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
			<div className={theme.container}>
				<h1>{props.title || 'Add Form'}</h1>
				<p>{props.description}</p>
				<Form {...props} onSubmit={this.onSubmit} />
			</div>
		);
	}
}

AddForm.ACTION_TYPE_SUBMIT = 'ADD_FORM_SUBMIT';
AddForm.displayName = 'AddForm';
AddForm.propTypes = {
	...cmfConnect.propTypes,
};

export default cmfConnect({ withDispatch: true, withComponentId: true })(AddForm);
