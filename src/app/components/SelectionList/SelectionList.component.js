import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cmfConnect, Inject } from '@talend/react-cmf';
import Immutable from 'immutable';
import theme from './SelectionList.scss';

function getClassName(item, activeId) {
	return classNames('list-group-item', {
		active: activeId === item.id,
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

	onClickToggle(event) {
		event.preventDefault();
		this.setState(s => ({ opened: !s.opened }));
	}

	onClick(event, item) {
		const id = item.id;
		this.props.setState({ active: id });
		this.props.dispatchActionCreator(SelectionList.ACTION_TYPE_SELECT_ITEM, event, {
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
				<h2 className={theme.title}>
					<a
						href="#open"
						onClick={this.onClickToggle}
					>
						<Inject component="Icon" componentId={this.state.opened ? 'selection-list-opened' : 'selection-list-closed'} />
						<span>{this.props.title}</span>
					</a>
					<button
						className="btn btn-primary btn-xs"
						title={`Add ${this.props.title}`}
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
								{item.name}
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
SelectionList.ACTION_TYPE_SELECT_ITEM = 'SelectionList#select';
SelectionList.ACTION_TYPE_ADD_ITEM = 'SelectionList#addItem';
SelectionList.actions = {
	[SelectionList.ACTION_TYPE_SELECT_ITEM]: (event, data) => ({
		type: SelectionList.ACTION_TYPE_SELECT_ITEM,
		...data,
	}),
};

export default cmfConnect({
	defaultState: new Immutable.Map(),
})(SelectionList);
