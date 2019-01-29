import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, Inject } from '@talend/react-cmf';
import { Inject as PureInject } from '@talend/react-components';

const getReactElement = PureInject.getReactElement;

function ViewFile(props) {
	if (!props.file) {
		return null;
	}
	let title = props.title;
	if (!title) {
		title = props.file.path.split('/').pop();
	}
	return (
		<div>
			{props.onDelete && (
				<button
					className="btn btn-danger pull-right"
					onClick={event => props.onDelete(event, props.file)}
				>
					Delete
				</button>
			)}
			<h1>{title}</h1>
			{getReactElement(props.getComponent, props.content)}
			<Inject component="ViewLogs" file={props.file} />
			<Inject component="FileAnalytics" path={props.file.path} />
		</div>
	);
}

ViewFile.displayName = 'ViewFile';
ViewFile.propTypes = {
	onDelete: PropTypes.func,
	title: PropTypes.string,
	content: getReactElement.propTypes,
	file: PropTypes.shape({
		path: PropTypes.string.isRequired,
	}),
	...cmfConnect.propTypes,
};

export default cmfConnect({ withDispatchActionCreator: true })(ViewFile);
