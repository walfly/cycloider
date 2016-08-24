import React from 'react';
import Disk from './Disk.jsx';
import Link from './Link.jsx';
import DrawingSurface from './DrawingSurface.jsx';
const {Component, PropTypes} = React;

const PartTypes = {
    'Disk': Disk,
    'Link': Link,
    'DrawingSurface': DrawingSurface
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
