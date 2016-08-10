const glMatrix = require('gl-matrix');
const constants = require('../constants.js');
const Point = require('./Point.js');

class Disk {
  constructor (x, y, options) {
    options = options || {};
    this.clockwise = options.clockwise || true;
    this.millisecondsPerRotation = options.millisecondsPerRotation || 1000;
    this.x = x;
    this.y = y;
    this.points = [];
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
    var deltaX = point.x - this.x;
    var deltaY = point.y - this.y;
    var radius = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    var curTheta = Math.atan2(deltaY, deltaX);
    var circumfrence = 2 * Math.PI * radius;
    var distance = circumfrence/fpr;
    var deltaTheta = distance/radius;
    var newTheta = this.clockwise ? curTheta - deltaTheta : curTheta + deltaTheta;
    var newDeltaX = radius * Math.cos(newTheta);
    var newDeltaY = radius * Math.sin(newTheta);
    return new Point(this.x + newDeltaX, this.y + newDeltaY);
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

module.exports = Disk;
