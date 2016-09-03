"use strict";
import {EventEmitter} from 'events';

export default class PartPlacer extends EventEmitter {
    constructor() {
        super();
        this.moveHandler = this.handleMouseMove.bind(this);
        this.clickHandler = this.handleMouseDown.bind(this);
        this.body = document.body;
        this.body.addEventListener('mousemove', this.moveHandler);
        this.body.addEventListener('mousedown', this.clickHandler);
    }
    handleMouseMove(e) {
        this.emit('positionUpdate', e.pageX, e.pageY);
    }
    handleMouseDown(e) {
        this.emit('positionChoose', e.pageX, e.pageY);
    }
    removeEvents() {
        this.body.removeEventListener('mousedown', this.clickHandler);
        this.body.removeEventListener('mousemove', this.moveHandler);
    } 
};
