import React from 'react';
import PropTypes from 'prop-types';
import { Inject, cmfConnect } from '@talend/react-cmf';

function ViewSaga(props) {
	return (
		<div>
			<h1>Saga: {props.item.name}</h1>
			<div>
				<ul>
					{(props.item.params.length > 1) && (
						<p>This saga has multiple arguments</p>
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
		name: PropTypes.string,
		params: PropTypes.array,
		path: PropTypes.string,
	}),
};
ViewSaga.defaultProps = {
	item: { params: [] },
};
export default cmfConnect({})(ViewSaga);
