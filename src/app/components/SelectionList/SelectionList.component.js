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
		this.onAddClick = this.onAddClick.bind(this);
	}

	onClick(event, item) {
		const id = item.get('id');
		this.props.setState({ active: id });
		this.props.dispatch({
			type: SelectionList.ACTION_TYPE_SELECT_ITEM,
			componentId: this.props.componentId,
			id,
		});
	}
	onAddClick() {
		this.props.dispatch({
			type: SelectionList.ACTION_TYPE_ADD_ITEM,
			componentId: this.props.componentId,
		});
	}

	render() {
		return (
			<div>
				<h2>{this.props.title}</h2>
				<button className="btn btn-primary" onClick={this.onAddClick}>
					Add
				</button>
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
SelectionList.ACTION_TYPE_SELECT_ITEM = 'SelectionList#selectItem';
SelectionList.ACTION_TYPE_ADD_ITEM = 'SelectionList#addItem';
SelectionList.actions = actions;

export default cmfConnect({
	defaultState: new Immutable.Map(),
})(SelectionList);
