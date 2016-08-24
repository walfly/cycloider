import React from 'react';
const {Component, PropTypes} = React;

export default class Link extends Component {
    render() {
        const drawPoint = this.props.part.getDrawPoint();
        return (
            <g>
                <line x1={this.props.part.start().x}
                      y1={this.props.part.start().y}
                      x2={this.props.part.end().x}
                      y2={this.props.part.end().y}
                      stroke="#000"
                      strokeWidth="2" />
                <circle cx={drawPoint[0]}
                        cy={drawPoint[1]}
                        r="10"
                        fill="#000"/>)
                </g>
        );
    }
}

Link.propTypes = {
    part: PropTypes.object
};
