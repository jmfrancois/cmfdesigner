/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';

function PureFnInternalComponent(props) {

}

PureFnInternalComponent.propTypes = {};
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
