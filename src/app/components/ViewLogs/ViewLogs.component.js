import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';

const ALERT_CLASSES = {
	error: 'alert alert-danger',
	warning: 'alert alert-warning',
};

const DISPLAY_NAME_INFO = `This component has no displayName.
When the code is minified for production,
 the component lost its name.
 The only way for CMF to keep track of it is to have a real uniq name`;

const PROP_TYPE_INFO = `This component has no propTypes.
In dev mode, React provide at runtime a props validation.
CMF can provide tools on that so it s better to have nice propTypes`;

const NO_DEPENDENT_INFO = `This file is not a dependency of any other.
It meas it s not referenced anywhere in your app.
It looks like dead code. please check and delete this file if it is true.`;

const EXTRA_INFO = [
	DISPLAY_NAME_INFO,
	PROP_TYPE_INFO,
	NO_DEPENDENT_INFO,
];

function ViewLogs(props) {
	const path = props.file.path;
	const logs = props.logs.filter(log => log.path === path);
	return (
		<div>
			{logs.map(log => (
				<div className={ALERT_CLASSES[log.level]}>
					<p>{log.message}</p>
					<p>{EXTRA_INFO[log.code]}</p>
				</div>
			))}
		</div>
	);
}

ViewLogs.displayName = 'ViewLogs';
ViewLogs.propTypes = {
	file: PropTypes.shape({ path: PropTypes.string }),
	logs: PropTypes.array.isRequired,
};
ViewLogs.defaultProps = {
	logs: [],
};

export default cmfConnect({
	defaultProps: {
		logsExpression: 'service#designer.logs:getAll',
	},
})(ViewLogs);
