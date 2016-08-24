import React from 'react';
const {Component, PropTypes} = React;

export default class Disk extends Component {
    render() {
        return (
            <g>
                <circle cx={this.props.part.x} 
                        cy={this.props.part.y}
                        r={this.props.part.radius} 
                        stroke="#000"
                        fill="transparent"/> 
                {this.props.part.points.map((point, index) => {
                    return (<circle key={index}
                                    cx={point.x}
                                    cy={point.y}
                                    r="10"
                                    fill="#000"/>)
                })}
            </g>
        );
    }
}

Disk.propTypes = {
    part: PropTypes.object
};
