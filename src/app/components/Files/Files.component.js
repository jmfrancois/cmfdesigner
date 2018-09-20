import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import FileAnalytics from '../FileAnalytics';

function Files(props) {
	return (
		<div>
			<h2>{props.title}</h2>
			{props.files.map(file => <FileAnalytics {...file} key={file.path} cwd={props.cwd} />)}
		</div>
	);
}

Files.displayName = 'Files';
Files.propTypes = {
	title: PropTypes.string,
	cwd: PropTypes.string,
	files: PropTypes.arrayOf(PropTypes.object),
};
Files.defaultProps = {
	files: [],
};
export default cmfConnect({})(Files);
