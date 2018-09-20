import React from 'react';
import PropTypes from 'prop-types';
import PanelDependencies from '../PanelDependencies';
import PanelExports from '../PanelExports';
import theme from './FileAnalytics.scss';

function getPath(path, cwd) {
	if (path && cwd) {
		return path.replace(cwd, '$');
	}
	return path;
}

function FileAnalytics(props) {
	return (
		<div>
			<h2 className={theme.title}>{getPath(props.path, props.cwd)}</h2>
			<div className={theme.content}>
				<PanelDependencies dependencies={props.dependencies} />
				{props.components.map((component, index) => (
					<div>
						<h3 key={index}>Component: {component.name}</h3>
						<ul>
							<li>Type: {component.type}</li>
							{component.propTypes && <li>has PropTypes</li>}
							{component.displayName && <li>displayName: {component.displayName}</li>}
						</ul>
						{!component.displayName && (
							<div className="alert alert-danger">
								<p>No DisplayName: In the context of CMF it s a requirement to add
									displayName to your component
								</p>
							</div>
						)}
						{!component.propTypes && (
							<div className="alert alert-warning">
								<p>No PropTypes: It's always better to add propTypes</p>
							</div>
						)}
					</div>
				))}
				<PanelExports dependencies={props.dependencies} />
			</div>
		</div>
	);
}

FileAnalytics.propTypes = {
	path: PropTypes.string,
	cwd: PropTypes.string,
	components: PropTypes.arrayOf(PropTypes.object),
	dependencies: PropTypes.arrayOf(PropTypes.object),
};
FileAnalytics.defaultProps = {
	components: [],
	dependencies: [],
};
FileAnalytics.displayName = 'FileAnalytics';

export default FileAnalytics;
