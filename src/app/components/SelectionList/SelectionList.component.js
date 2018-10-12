import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cmfConnect, Inject } from '@talend/react-cmf';
import Immutable from 'immutable';
import theme from './SelectionList.scss';

const PER_PAGE = 10;

function getClassName(item, activeId) {
	return classNames('list-group-item', {
		active: activeId === item.id,
		[theme.error]: item.level === 'error',
		[theme.warning]: item.level === 'warning',
	});
}

function getItems(items, offset, perPage) {
	return items.slice(offset, offset + perPage);
}

function hasPrevious(offset, perPage) {
	if (offset < perPage) {
		return false;
	}
	return true;
}

function hasNext(offset, perPage, length) {
	return (length - offset) > (offset + perPage);
}

function getPreviousOffset(offset, perPage) {
	if (offset <= perPage) {
		return 0;
	}
	return offset - perPage;
}

function getNextOffset(offset, perPage) {
	return offset + perPage;
}

class SelectionList extends React.Component {

	constructor(props) {
		super(props);
		this.state = { opened: true, offset: 0 };
		this.onClick = this.onClick.bind(this);
		this.onAddClick = this.onAddClick.bind(this);
		this.onClickToggle = this.onClickToggle.bind(this);
		this.onPreviousClick = this.onPreviousClick.bind(this);
		this.onNextClick = this.onNextClick.bind(this);
	}

	onPreviousClick() {
		this.setState(prevState => ({ offset: getPreviousOffset(prevState.offset, PER_PAGE) }));
	}

	onNextClick() {
		this.setState(prevState => ({
			offset: getNextOffset(prevState.offset, PER_PAGE),
		}));
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
						<span className="badge">{this.props.items.length}</span>
					</a>
					{this.props.addButton && (
						<button
							className="btn btn-primary btn-sm"
							title={`Add ${this.props.title}`}
							onClick={this.onAddClick}
						>
							<Inject component="Icon" componentId="selection-list-add" />
						</button>
					)}
				</h2>
				{this.state.opened && (
					<div className="list-group">
						{getItems(this.props.items, this.state.offset, PER_PAGE).map((item, index) => (
							<button
								key={index}
								className={getClassName(item, this.props.state.get('active'))}
								onClick={event => this.onClick(event, item)}
							>
								{item.name}
							</button>
						))}
						{this.props.items.length > PER_PAGE && (
							<div className="list-group-item">
								<div className="btn-group">
									<button disabled={!hasPrevious(this.state.offset, PER_PAGE)} className="btn btn-default" onClick={this.onPreviousClick}>Prev</button>
									<button disabled={!hasNext(this.state.offset, PER_PAGE, this.props.items.length)} className="btn btn-default" onClick={this.onNextClick}>Next</button>
								</div>
							</div>
						)}
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
