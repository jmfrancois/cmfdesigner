import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cmfConnect } from '@talend/react-cmf';
import Immutable from 'immutable';
import * as actions from './actions';

function getClassName(item, activeId) {
	return classNames('list-group-item', {
		active: activeId === item.get('id'),
	});
}

class SelectionList extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(event, item) {
		this.props.setState({ active: item.get('id')});
	}

	render() {
		if (this.props.items.size === 0) {
			return null;
		}
		return (
			<div>
				<h2>{this.props.title}</h2>
				<div className="list-group">
					{this.props.items.map((item, index) => (
						<a
							key={index}
							className={getClassName(item, this.props.state.get('active'))}
							onClick={event => this.onClick(event, item)}
						>
							{item.get('name')}
						</a>
					))}
				</div>
			</div>
		);
	}
}

SelectionList.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array,
	onClick: PropTypes.func,
	activeId: PropTypes.string,
	...cmfConnect.propTypes,
};
SelectionList.defaultProps = {
	items: [],
};

SelectionList.actions = actions;

export default cmfConnect({
	defaultState: new Immutable.Map(),
})(SelectionList);
