"use strict";
import React from 'react';
const {Component, PropTypes} = React;

export default class ControlsApp extends Component {
    clockwise(e) {
        this.props.onClockwise(e);
    }
    counterclockwise(e) {
        this.props.onCounterclockwise(e);
    }
    play() {
        this.props.onPlay();
    }
    link() {
        this.props.onLink();
    }
    render() {
        return (
            <div className="control-app">
                <button onClick={(e) => this.clockwise(e)}> clockwise </button>
                <button onClick={(e) => this.counterclockwise(e)}> counterclockwise </button>
                <button onClick={(e) => this.link(e)}> Link </button>
                <button onClick={(e) => this.play(e)}> play </button>
            </div>
        );
    }
};

ControlsApp.propTypes = {
    onClockwise: PropTypes.func,
    onCounterclockwise: PropTypes.func,
    onPlay: PropTypes.func,
    onLink: PropTypes.func
};

