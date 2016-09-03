"use strict";

import React from 'react';

const {Component, PropTypes} = React;

export default class DrawingSurfaceDetails extends Component {
    render() {
        return (
            <li>
                Drawing Surface
            </li>
        );
    }

};

DrawingSurfaceDetails.propTypes = {
    part: PropTypes.object
};
