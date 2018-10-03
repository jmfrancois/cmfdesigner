import React from 'react';
import PropTypes from 'prop-types';
import { Inject } from '@talend/react-cmf';
import ViewFunctionParam from '../ViewFunctionParam';


function Export(props) {
	return (
		<span className="export-container">
			<span className="export-definition">export {props.default && 'default'} [{props.type}{props.generator && '*'}] {props.name}</span>
			{props.params && <span className="export-function-params"><ViewFunctionParam params={props.params} /></span>}
			{props.properties && (
				<ul className="export-object-properties">
					{Object.keys(props.properties).map(key => (
						<li key={key}>[{props.properties[key].type}] {key} </li>
					))}
				</ul>
			)}
		</span>
	);
}
Export.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string,
	default: PropTypes.bool,
	generator: PropTypes.bool,
	params: PropTypes.array,
	properties: PropTypes.shape({
		type: PropTypes.string.isRequired,
	}),
};

class PanelExports extends React.Component {

	constructor(props) {
		super(props);
		this.state = { opened: true };
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		event.preventDefault();
		this.setState({ opened: !this.state.opened });
	}

	render() {
		if (this.props.export.length === 0) {
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
						{this.props.export.map((dep, index) => (
							<li key={index}><Export {...dep} /></li>
						))}
					</ul>
				)}
			</div>
		);
	}
}

PanelExports.propTypes = {
	export: PropTypes.arrayOf(PropTypes.shape({
		default: PropTypes.bool,
		name: PropTypes.string,
	})),
};
PanelExports.defaultProps = {
	export: [],
};
PanelExports.displayName = 'PanelExports';

export default PanelExports;
