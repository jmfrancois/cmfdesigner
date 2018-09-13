import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { cmfConnect } from '@talend/react-cmf';

class AppSwitcher extends React.Component {
	static propTypes = {
		name: PropTypes.string,
		...cmfConnect.propTypes,
	};

	constructor(props) {
		super(props);
		this.state = { editMode: false };
		this.onChange = this.onChange.bind(this);
		this.onEditBtn = this.onEditBtn.bind(this);
		this.onGenerateAppBtn = this.onGenerateAppBtn.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(event) {
		event.preventDefault();
		this.setState({ editMode: false });
		this.props.setState({ path: this.state.path });
		this.props.dispatch({
			type: AppSwitcher.ACTION_TYPE_SET_CWD,
			path: this.state.path,
		});
	}

	onChange(event) {
		this.setState({ path: event.target.value });
	}

	onEditBtn() {
		this.setState({ editMode: true });
	}

	onGenerateAppBtn() {
		this.props.dispatch({
			type: AppSwitcher.ACTION_TYPE_ADD_APP,
		});
	}

	render() {
		if (!this.props.app || this.state.editMode) {
			return (
				<form onSubmit={this.onSubmit}>
					<h2>App</h2>
					<div className="form-group">
						<label>Current working directory</label>
						<input name="path" type="text" className="form-control" onChange={this.onChange} value={this.state.path} />
					</div>
					<button className="btn btn-primary pull-right">Submit</button>
				</form>
			);
		}
		return (
			<div>
				<h2>App</h2>
				<p>CWD: <strong>{this.props.app.get('path')}</strong></p>
				<div className="btn-group">
					<button type="button" className="btn btn-default" onClick={this.onEditBtn}>Edit</button>
					<button type="button" className="btn btn-primary" onClick={this.onGenerateAppBtn}>Generate CMF Webapp Here</button>
				</div>
			</div>
		);
	}
}

AppSwitcher.ACTION_TYPE_ADD_APP = 'APP_SWITCHER_ADD_APP';
AppSwitcher.ACTION_TYPE_SET_CWD = 'APP_SWITCHER_SET_CWD';

export default cmfConnect({
	defaultState: new Immutable.Map(),
})(AppSwitcher);
