"use strict";

import React from 'react';

const {Component, PropTypes} = React;

export default class LinkDetails extends Component {
    drawDistChange() {

    }
    render() {
        return (
            <li>
                <h4>link</h4>
                <label htmlFor="drawDist"> Distance Of Pen Tool </label>
                <input value={this.props.part.drawingDist}
                       name="drawDist"
                       type="number"
                       onChange={(e) => { this.drawDistChange(e); }}/>
            </li>
        );
    }

};

LinkDetails.propTypes = {
    part: PropTypes.object
};
