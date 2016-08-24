import glMatrix from 'gl-matrix';
import constants from '../constants.js';
import Point from './Point.js';
import Guid from 'guid';

export default class Disk {
  constructor (x, y, options) {
    options = options || {};
    this.clockwise = options.clockwise || true;
    this.millisecondsPerRotation = options.millisecondsPerRotation || 1000;
    this.x = x;
    this.y = y;
    this.points = [];
    this.partId = Guid.raw();
    this.type = 'Disk';
  }

  calculateFramesPR (elapsedTime) {
    return this.millisecondsPerRotation/elapsedTime;
  }

  addPoint (vec2) {
    this.points.push(vec2);
    return this;
  }

  setMillisecondsPerRotation (milliseconds) {
    this.millisecondsPerRotation = milliseconds;
    return this;
  }

  rotatePoints (elapsedTime) {
    const fpr = this.calculateFramesPR(elapsedTime);
    return this.points.map(this.rotatePoint.bind(this, fpr));
  }

  rotatePoint (fpr, point) {
    return this.rotateAroundAPoint(fpr, point, {x: this.x, y: this.y}, this.clockwise);
  }

  rotateAroundAPoint (fpr, point, center, clockwise) {
    const deltaX = point.x - center.x;
    const deltaY = point.y - center.y;
    const radius = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    const curTheta = Math.atan2(deltaY, deltaX);
    const circumfrence = 2 * Math.PI * radius;
    const distance = circumfrence/fpr;
    const deltaTheta = distance/radius;
    const newTheta = clockwise ? curTheta - deltaTheta : curTheta + deltaTheta;
    const newDeltaX = radius * Math.cos(newTheta);
    const newDeltaY = radius * Math.sin(newTheta);
    return new Point(center.x + newDeltaX, center.y + newDeltaY);
  }

  update (timestamp) {
    // if(!this.timestamp) {
    //   this.timestamp = timestamp;
    //   return this;
    // }
    // var elapsedTime = timestamp - this.timestamp;
    // this.timestamp = timestamp;
    this.points = this.rotatePoints(32);
    return this;
  }
};
