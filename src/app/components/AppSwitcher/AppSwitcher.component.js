import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { cmfConnect, Inject } from '@talend/react-cmf';

class AppSwitcher extends React.Component {
	static displayName = 'AppSwitcher';
	static propTypes = {
		name: PropTypes.string,
		...cmfConnect.propTypes,
	};

	constructor(props) {
		super(props);
		// this.state = { editMode: false };
		// this.onChange = this.onChange.bind(this);
		// this.onEditBtn = this.onEditBtn.bind(this);
		this.onGenerateAppBtn = this.onGenerateAppBtn.bind(this);
		// this.onSubmit = this.onSubmit.bind(this);
	}

	// onSubmit(event) {
	// 	event.preventDefault();
	// 	this.setState({ editMode: false });
	// 	this.props.dispatch({
	// 		type: AppSwitcher.ACTION_TYPE_SET_CWD,
	// 		path: this.state.path,
	// 	});
	// }

	// onChange(event) {
	// 	this.setState({ path: event.target.value });
	// }

	// onEditBtn() {
	// 	this.setState({ editMode: true });
	// }

	onGenerateAppBtn() {
		this.props.dispatch({
			type: AppSwitcher.ACTION_TYPE_ADD_APP,
		});
	}

	render() {
		const cwd = this.props.cwd;
		if (!cwd) {
			return (
				<div className="alert alert-danger">
					<p>Bad setup you don t have a working directory from the backend</p>
				</div>
			);
			// return (
			// 	<form onSubmit={this.onSubmit}>
			// 		<h2>App</h2>
			// 		<div className="form-group">
			// 			<label>Current working directory</label>
			// 			<input name="path" type="text" className="form-control" onChange={this.onChange} value={this.state.path} />
			// 		</div>
			// 		<button className="btn btn-primary pull-right">Submit</button>
			// 	</form>
			// );
		}
		return (
			<div>
				<h2>Working directory</h2>
				<strong>{this.props.cwd}</strong>
				<div>
					{!this.props.isWebapp && (
						<button type="button" className="btn btn-primary" onClick={this.onGenerateAppBtn}>
							<Inject component="Icon" name="talend-plus" />
							Generate CMF Webapp
						</button>
					)}
				</div>
			</div>
		);
	}
}

AppSwitcher.ACTION_TYPE_ADD_APP = 'APP_SWITCHER_ADD_APP';
AppSwitcher.ACTION_TYPE_SET_CWD = 'APP_SWITCHER_SET_CWD';

export default cmfConnect({})(AppSwitcher);
