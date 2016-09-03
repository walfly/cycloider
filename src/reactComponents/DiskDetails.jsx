"use strict";

import React from 'react';

const {Component, PropTypes} = React;

export default class DiskDetails extends Component {
    sprChange(event) {
        const num = Number(event.target.value);
        if (!isNaN(num)){
            this.props.part.setMPR(num * 1000);
        }
    }
    render() {
        return (
            <li>
                <h4>Disk</h4>
                <label htmlFor="spr"> Seconds Per Rotation </label>
                <input value={this.props.part.millisecondsPerRotation/1000}
                       name="spr"
                       type="number"
                       onChange={(e) => { this.sprChange(e); }}/>
            </li>
        );
    }

};

DiskDetails.propTypes = {
    part: PropTypes.object
};
