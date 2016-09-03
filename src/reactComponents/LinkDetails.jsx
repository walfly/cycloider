"use strict";

import React from 'react';

const {Component, PropTypes} = React;

export default class LinkDetails extends Component {
    render() {
        return (
            <li>
                link
            </li>
        );
    }

};

LinkDetails.propTypes = {
    part: PropTypes.object
};
