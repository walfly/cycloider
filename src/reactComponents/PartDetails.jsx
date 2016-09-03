"use strict";

import React from 'react';
import DiskDetails from './DiskDetails.jsx';
import LinkDetails from './LinkDetails.jsx';
import DrawingSurfaceDetails from './DrawingSurfaceDetails.jsx';
const {Component, PropTypes} = React;

const PartComponents = {
    'Disk': DiskDetails,
    'Link': LinkDetails,
    'DrawingSurface': DrawingSurfaceDetails
};

export default class PartDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: this.props.parts
        };
    }
    render() {
        return (
            <form>
                <ul>
                    {this.state.parts.map((part) => {
                        const PartComponent = PartComponents[part.type];
                        return <PartComponent part={part} key={part.partId}/>
                    })}
                </ul>
            </form>
        );
    }

};

PartDetails.propTypes = {
    parts: PropTypes.array,
    drawingSpeed: PropTypes.number
};
