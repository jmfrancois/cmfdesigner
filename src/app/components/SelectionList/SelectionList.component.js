import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';

function SelectionList(props) {
	if (props.items.size === 0) {
		return null;
	}
	return (
		<div>
			<h2>{props.title}</h2>
			<div className="list-group">
				{props.items.map((value, index) => (
					<a key={index} className="list-group-item">
						{value.get('name')}
					</a>
				)
				)}
			</div>
		</div>
	);
}

SelectionList.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array,
};
SelectionList.defaultProps = {
	items: [],
};

export default cmfConnect({})(SelectionList);
