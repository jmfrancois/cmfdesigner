import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, Inject } from '@talend/react-cmf';
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
			<button
				className={`${theme.opn} btn btn-default btn-inverse btn-xs`}
				onClick={() => props.dispatch({
					type: FileAnalytics.ACTION_TYPE_OPEN,
					path: props.path,
				})}
			>
				<Inject component="Icon" name="talend-link" />
				open
			</button>
			<div className={theme.content}>
				<PanelDependencies dependencies={props.dependencies} />
				<PanelExports export={props.export} />
			</div>
		</div>
	);
}

FileAnalytics.propTypes = {
	path: PropTypes.string,
	cwd: PropTypes.string,
	dependencies: PropTypes.arrayOf(PropTypes.object),
	export: PropTypes.arrayOf(PropTypes.object),
	dispatch: PropTypes.func,
};
FileAnalytics.defaultProps = {
	components: [],
	dependencies: [],
};
FileAnalytics.displayName = 'FileAnalytics';
FileAnalytics.ACTION_TYPE_OPEN = 'FILE_ANALYTICS_OPEN';

function mapStateToProps(state, ownProps) {
	if (ownProps.path) {
		const found = state.cmf.collections.get('analytics').find(analytics => analytics.get('path') === ownProps.path);
		if (found) {
			return { ...found.toJS() };
		}
	}
	return {};
}

export default cmfConnect({
	mapStateToProps,
	defaultProps: {
		cwdExpression: 'getCWD',
	},
})(FileAnalytics);
