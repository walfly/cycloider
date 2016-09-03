import React from 'react';
const {Component, PropTypes} = React;

export default class Link extends Component {
    render() {
      let circle;
      let line;
      if (this.props.part.drawingDist) {
        const drawPoint = this.props.part.getDrawPoint();
        circle = (<circle cx={drawPoint[0]}
                          cy={drawPoint[1]}
                          r="10"
                          fill="#000"/>);
      }
      if (this.props.part.startFulcrum && this.props.part.endFulcrum) {
        line = (<line x1={this.props.part.start().x}
                      y1={this.props.part.start().y}
                      x2={this.props.part.end().x}
                      y2={this.props.part.end().y}
                      stroke="#000"
                      style={{pointerEvents: "none"}}
                      strokeWidth="2" />);
      }
      return (
          <g>
              {circle}
              {line}
          </g>
      );
    }
}

Link.propTypes = {
    part: PropTypes.object
};
