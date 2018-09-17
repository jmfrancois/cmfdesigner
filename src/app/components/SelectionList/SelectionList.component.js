import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cmfConnect, Inject } from '@talend/react-cmf';
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
		this.state = { opened: true };
		this.onClick = this.onClick.bind(this);
		this.onAddClick = this.onAddClick.bind(this);
		this.onClickToggle = this.onClickToggle.bind(this);
	}

	onClickToggle() {
		this.setState(s => ({ opened: !s.opened }));
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
				<h2>
					<button
						className="btn btn-default btn-xs"
						onClick={this.onClickToggle}
					>
						<Inject component="Icon" componentId={this.state.opened ? 'selection-list-opened' : 'selection-list-closed'} />
					</button>
					<span>{this.props.title}</span>
					<button
						className="btn btn-primary btn-xs"
						onClick={this.onAddClick}
					>
						<Inject component="Icon" componentId="selection-list-add" />
					</button>
				</h2>
				{this.state.opened && (
					<div className="list-group">
						{this.props.items.map((item, index) => (
							<button
								key={index}
								className={getClassName(item, this.props.state.get('active'))}
								onClick={event => this.onClick(event, item)}
							>
								{item.get('name')}
							</button>
						))}
					</div>
				)}
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
SelectionList.displayName = 'SelectionList';
SelectionList.ACTION_TYPE_SELECT_ITEM = 'SelectionList#selectItem';
SelectionList.ACTION_TYPE_ADD_ITEM = 'SelectionList#addItem';
SelectionList.actions = actions;

export default cmfConnect({
	defaultState: new Immutable.Map(),
})(SelectionList);
