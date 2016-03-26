var glMatrix = require('gl-matrix');

var Point = function (x, y) {
  this.x = x;
  this.y = y;
  this.vector = glMatrix.vec2.set(glMatrix.vec2.create(), x, y); 
};

module.exports = Point;
