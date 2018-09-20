import React from 'react';
import PropTypes from 'prop-types';

function getPath(path, cwd) {
	if (path && cwd) {
		return path.replace(cwd, '$');
	}
	return path;
}

function FileAnalytics(props) {
	return (
		<li key={props.path}>
			{getPath(props.path, props.cwd)}
			<ul>
				{props.components.map((component, index) => (
					<li key={index}>
						{component.name}
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
					</li>
				))}
			</ul>
		</li>
	);
}

FileAnalytics.propTypes = {
	path: PropTypes.string,
	cwd: PropTypes.string,
	components: PropTypes.arrayOf(PropTypes.object),
};
FileAnalytics.defaultProps = {
	components: [],
};

export default FileAnalytics;
