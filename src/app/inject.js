import React from 'react';
import PropTypes from 'prop-types';
import { Inject } from '@talend/react-cmf';

export default function inject(config) {
	if (!config) {
		return null;
	}
	if (Array.isArray(config)) {
		return config.map((value, index) => <Inject {...value} key={index} />);
	}
	if (React.isValidElement(config)) {
		return config;
	}
	if (typeof config === 'object') {
		if (config.component) {
			return <Inject {...config} />;
		}
		// } else if (config.html) {
		// 	const { html, ...props } = config;
		// 	return React.createElement(html, props);
		// }
	}
	throw new Error(`can t render ${config}`);
}


inject.propTypes = PropTypes.oneOfType([
	PropTypes.array,
	PropTypes.object,
	PropTypes.node,
]);
