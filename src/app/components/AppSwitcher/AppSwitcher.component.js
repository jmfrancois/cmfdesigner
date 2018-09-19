import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, Inject } from '@talend/react-cmf';

class AppSwitcher extends React.Component {
	constructor(props) {
		super(props);
		this.onGenerateAppBtn = this.onGenerateAppBtn.bind(this);
	}

	onGenerateAppBtn() {
		this.props.dispatch({
			type: AppSwitcher.ACTION_TYPE_ADD_APP,
		});
	}

	render() {
		if (!this.props.cwd) {
			return (
				<div className="alert alert-danger">
					<p>Bad setup you don t have a working directory from the backend</p>
				</div>
			);
		}
		return (
			<div>
				<h2>Working directory</h2>
				<strong>{this.props.cwd}</strong>
				<div>
					{this.props.isWebapp ? null : (
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
AppSwitcher.displayName = 'AppSwitcher';
AppSwitcher.propTypes = {
	cwd: PropTypes.string.isRequired,
	isWebapp: PropTypes.bool,
	...cmfConnect.propTypes,
};

export default cmfConnect({})(AppSwitcher);
