import React from 'react';
import Part from './Part.jsx';
const {Component, PropTypes} = React;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: this.props.parts
        };
    }
    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                {this.state.parts.map((part) => {
                    return <Part key={part.partId} part={part}/>;
                })}
            </svg>
        );
    }
}

App.propTypes = {
    parts: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
}; 
