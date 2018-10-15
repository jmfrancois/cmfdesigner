/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';

function PureFnInternalComponent(props) {

}

PureFnInternalComponent.propTypes = {
    optionalArray: PropTypes.array,
	optionalBool: PropTypes.bool,
	optionalFunc: PropTypes.func,
	optionalNumber: PropTypes.number,
	optionalObject: PropTypes.object,
	optionalString: PropTypes.string,
	optionalSymbol: PropTypes.symbol,
	optionalNode: PropTypes.node,
	optionalElement: PropTypes.element,
	optionalEnum: PropTypes.oneOf(['News', 'Photos']),
	optionalUnion: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
	optionalObjectOf: PropTypes.objectOf(PropTypes.number),
	optionalObjectWithShape: PropTypes.shape({
		color: PropTypes.string,
		fontSize: PropTypes.number,
	}),
 	requiredFunc: PropTypes.func.isRequired,
	requiredAny: PropTypes.any.isRequired,
};
PureFnInternalComponent.displayName = 'PureFnInternalComponent';

class StateFullInternalComponent extends React.Component {
    static displayName = 'StateFullInternalComponent';
    static propTypes = {};
}

export function PureFnExportedComponent(props) {

}

PureFnExportedComponent.propTypes = {};
PureFnExportedComponent.displayName = 'PureFnExportedComponent';


export class StateFullExternalComponent extends React.Component {
    static displayName = 'StateFullExternalComponent';
    static propTypes = {};
}


export default cmfConnect({})(StateFullInternalComponent);
