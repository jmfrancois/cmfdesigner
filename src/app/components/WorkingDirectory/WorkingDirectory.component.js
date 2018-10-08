import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, Inject } from '@talend/react-cmf';
import theme from './WorkingDirectory.scss';

function WorkingDirectory(props) {
	const cwd = props.cwd;
	if (!cwd) {
		return (
			<div className="alert alert-danger">
				<p>Bad setup you don t have a working directory from the backend</p>
			</div>
		);
	}
	return (
		<div className={theme.container}>
			<h2 className={theme.title}>Working directory</h2>
			<strong className={theme.cwd}>{props.cwd}</strong>
			{!props.isWebapp && (
				<div className="alert alert-warning">
					<p>This folder do not contains a cmf webapp.</p>
					<button
						type="button"
						className={`btn btn-primary ${theme.isNotWebapp}`}
						onClick={() => props.dispatch({
							type: WorkingDirectory.ACTION_TYPE_ADD_APP,
							componentId: props.componentId,
						})}
					>
						<Inject component="Icon" name="talend-plus" />
						Generate CMF Webapp
					</button>
				</div>
			)}
		</div>
	);
}

WorkingDirectory.displayName = 'WorkingDirectory';
WorkingDirectory.ACTION_TYPE_ADD_APP = 'WORKING_DIRECTORY_ADD_APP';
WorkingDirectory.propTypes = {
	cwd: PropTypes.string.isRequired,
	isWebapp: PropTypes.bool,
	...cmfConnect.propTypes,
};

export default cmfConnect({
	defaultProps: {
		cwdExpression: 'getCWD',
		isWebappExpression: 'isWebapp',
	},
})(WorkingDirectory);
