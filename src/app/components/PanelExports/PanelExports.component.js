import React from 'react';
import PropTypes from 'prop-types';
import { Inject } from '@talend/react-cmf';

class PanelExports extends React.Component {

	constructor(props) {
		super(props);
		this.state = { opened: false };
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		event.preventDefault();
		this.setState({ opened: !this.state.opened });
	}

	render() {
		if (this.props.dependencies.length === 0) {
			return null;
		}
		return (
			<div>
				<h3>
					<a href="#open-export" onClick={this.onClick}>
						<Inject component="Icon" componentId={this.state.opened ? 'selection-list-opened' : 'selection-list-closed'} />
						Exports
					</a>
				</h3>
				{this.state.opened && (
					<ul>
						{this.props.dependencies.map((dep, index) => (
							<li key={index}>
								import {!dep.default && '{'} {dep.name} {!dep.default && '}'} from '{dep.source}';
							</li>
						))}
					</ul>
				)}
			</div>
		);
	}
}

PanelExports.propTypes = {
	dependencies: PropTypes.arrayOf(PropTypes.shape({
		default: PropTypes.bool,
		name: PropTypes.string,
	})),
};
PanelExports.defaultProps = {
	dependencies: [],
};
PanelExports.displayName = 'PanelExports';

export default PanelExports;