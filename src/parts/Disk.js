var glMatrix = require('gl-matrix');
var constants = require('../constants.js');
var Point = require('./Point.js');

var Disk = function (x, y, options) {
  options = options || {};
  this.clockwise = options.clockwise || true;
  this.millisecondsPerRotation = options.millisecondsPerRotation || 1000;
  this.framesPerRotation = this.calculateFramesPR();
  this.x = x;
  this.y = y;
  this.points = [];
};

Disk.prototype.calculateFramesPR = function() {
  return this.millisecondsPerRotation/constants.ONE_FRAME;
};

Disk.prototype.addPoint = function (vec2) {
  this.points.push(vec2);
  return this;
};

Disk.prototype.setMillisecondsPerRotation = function (milliseconds) {
  this.millisecondsPerRotation = milliseconds;
  this.framesPerRotation = this.calculateFramesPR();
  return this;
};

Disk.prototype.rotatePoints = function () {
  return this.points.map(this.rotatePoint.bind(this));
};

Disk.prototype.rotatePoint = function (point) {
  var deltaX = point.x - this.x;
  var deltaY = point.y - this.y;
  var radius = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
  var curTheta = Math.atan2(deltaY, deltaX);
  var circumfrence = 2 * Math.PI * radius;
  var distance = circumfrence/this.framesPerRotation;
  var deltaTheta = distance/radius;
  var newTheta = this.clockwise ? curTheta - deltaTheta : curTheta + deltaTheta;
  var newDeltaX = radius * Math.cos(newTheta);
  var newDeltaY = radius * Math.sin(newTheta);
  debugger;
  return new Point(this.x + newDeltaX, this.y + newDeltaY);
};

Disk.prototype.update = function() {
  this.points = this.rotatePoints();
  return this;
};

module.exports = Disk;
