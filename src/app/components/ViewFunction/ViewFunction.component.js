import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import ViewFunctionParam from '../ViewFunctionParam';


function ViewFunction(props) {
	const fn = props.fn;
	const hasKey = (fn.key && fn.name !== fn.key);
	return (
		<div>
			{hasKey && <span>{`{ ${fn.key}: `}</span>}
			<span>function{fn.generator && '*'} {fn.name}<ViewFunctionParam params={fn.params || []} /></span>
			{hasKey && <span>{' }'}</span>}
			{'{ ... }'}
		</div>
	);
}

ViewFunction.propTypes = {
	fn: PropTypes.shape({
		key: PropTypes.string,
		name: PropTypes.string,
		params: PropTypes.array,
		path: PropTypes.string,
	}),
};
ViewFunction.defaultProps = {
	fn: { params: [] },
};
ViewFunction.displayName = 'ViewFunction';

export default cmfConnect({})(ViewFunction);
