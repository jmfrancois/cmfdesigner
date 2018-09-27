import React from 'react';
import PropTypes from 'prop-types';
import cmfConnect from '@talend/react-cmf/lib/cmfConnect';
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
				<PanelExports dependencies={props.export} />
			</div>
		</div>
	);
}

FileAnalytics.propTypes = {
	path: PropTypes.string,
	cwd: PropTypes.string,
	dependencies: PropTypes.arrayOf(PropTypes.object),
	export: PropTypes.arrayOf(PropTypes.object),
};
FileAnalytics.defaultProps = {
	components: [],
	dependencies: [],
};
FileAnalytics.displayName = 'FileAnalytics';

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
