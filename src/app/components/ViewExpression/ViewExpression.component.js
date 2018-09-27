import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, Inject } from '@talend/react-cmf';


function ViewExpression(props) {
	return (
		<div>
			<h1>Expression: {props.item.name}</h1>
			<div>
				<ul>
					{(props.item.params.length > 1) && (
						<p>This expression has multiple arguments</p>
					)}
				</ul>
			</div>
			<Inject component="FileAnalytics" path={props.item.path} />
		</div>
	);
}

ViewExpression.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string,
		params: PropTypes.array,
		path: PropTypes.string,
	}),
};
export default cmfConnect({})(ViewExpression);
