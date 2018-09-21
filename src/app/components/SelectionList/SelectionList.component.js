import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import { cmfConnect } from '@talend/react-cmf';
import { Icon } from '@talend/react-components';
import Immutable from 'immutable';

import theme from './SelectionList.scss';

class SelectionList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { opened: true };
		this.onClick = this.onClick.bind(this);
		this.onAddClick = this.onAddClick.bind(this);
		this.onClickToggle = this.onClickToggle.bind(this);
	}

	onClickToggle() {
		this.setState(({ opened }) => ({ opened: !opened }));
	}

	onClick(event, item) {
		const id = item.get('id');
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
			<React.Fragment>
				<div className={theme.header}>
					<button className="btn btn-link" onClick={this.onClickToggle}>
						<Icon
							name="talend-chevron-left"
							transform={this.state.opened ? 'rotate-270' : 'rotate-180'}
						/>
					</button>
					<h2>{this.props.title}</h2>
					<button className={classNames('btn btn-primary', theme.add)} onClick={this.onAddClick}>
						<Icon name="talend-plus" />
					</button>
				</div>
				{this.state.opened && (
					<div className="list-group">
						{this.props.items.map((item, index) => (
							<button
								key={index}
								className="list-group-item"
								onClick={event => this.onClick(event, item)}
							>
								{item.get('name')}
							</button>
						))}
					</div>
				)}
			</React.Fragment>
		);
	}
}

SelectionList.propTypes = {
	title: PropTypes.string,
	items: PropTypes.oneOfType([PropTypes.array, ImmutablePropTypes.list]),
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

export default cmfConnect({
	defaultState: new Immutable.Map(),
})(SelectionList);
