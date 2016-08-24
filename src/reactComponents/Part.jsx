import React from 'react';
import Disk from './Disk.jsx';
import Link from './Link.jsx';
const {Component, PropTypes} = React;

const PartTypes = {
    'Disk': Disk,
    'Link': Link
};

export default class Part extends Component {
    render() {
        const RenderedComponent = PartTypes[this.props.part.type];
        return (
            <RenderedComponent part={this.props.part} />
        );
    }
};

Part.propTypes = {
    part: PropTypes.object
};
