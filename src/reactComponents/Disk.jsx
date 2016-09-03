"use strict";

import React from 'react';
const {Component, PropTypes} = React;

export default class Disk extends Component {
    seconds() {
        return this.props.part.millisecondsPerRotation/1000;
    }
    onMouseEnter() {
        if (this.props.part.isReadyForLink) {
            this.props.part.setFillColor('#808080');
        }
    }
    onMouseLeave() {
        this.props.part.setFillColor('transparent');       
    }
    onClick() {
        if (this.props.part.isReadyForLink) {
            this.props.part.addToLink()
        }
    }
    render() {
        return (
            <g>
                <circle cx={this.props.part.x} 
                        cy={this.props.part.y}
                        r={this.props.part.radius} 
                        stroke="#000"
                        fill={this.props.part.fillColor}
                        onMouseLeave={() => this.onMouseLeave()}
                        onMouseEnter={() => this.onMouseEnter()}
                        onClick={() => this.onClick()}/>
                <text textAnchor="middle"
                      x={this.props.part.x}
                      y={this.props.part.y}
                      style={{pointerEvents: "none"}}>
                      {this.seconds()} 
                </text>
                <text textAnchor="middle"
                      x={this.props.part.x}
                      y={this.props.part.y + 15}
                      style={{pointerEvents: "none"}}>
                      spr
                </text>
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
