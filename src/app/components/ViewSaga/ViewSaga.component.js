import React from 'react';
import PropTypes from 'prop-types';
import { Inject, cmfConnect } from '@talend/react-cmf';
import ViewFunctionParam from '../ViewFunctionParam';

function ViewSaga(props) {
	const hasKey = (props.item.key && props.item.name !== props.item.key);
	const hasParams = props.item.params && props.item.params.length > 0;
	return (
		<div>
			<h1>Saga: {hasKey ? props.item.key : props.item.name}</h1>
			<div>
				<ul>
					{hasKey && <li>function name: {props.item.name}</li>}
					{(hasParams) && (
						<li>Params: <ViewFunctionParam params={props.item.params} /></li>
					)}
				</ul>
			</div>
			<Inject component="FileAnalytics" path={props.item.path} />
		</div>
	);
}
ViewSaga.displayName = 'ViewSaga';
ViewSaga.propTypes = {
	item: PropTypes.shape({
		key: PropTypes.string,
		name: PropTypes.string,
		params: PropTypes.array,
		path: PropTypes.string,
	}),
};
ViewSaga.defaultProps = {
	item: { params: [] },
};
export default cmfConnect({})(ViewSaga);
