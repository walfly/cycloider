import React from 'react';
const {Component, PropTypes} = React;

export default class DrawingSurface extends Component {
    render() {
        return (
            <g>
                <path d={this.props.part.path}
                      strokeWidth="1"
                      stroke="#000"
                      fill="none"></path>
            </g>
        );
    }
}

DrawingSurface.propTypes = {
    part: PropTypes.object
};
