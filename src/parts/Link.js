var glMatrix = require('gl-matrix');

class Link {
  constructor(startFulcrum, endFulcrum, drawingDist){
    this.start = startFulcrum;
    this.end = endFulcrum;
  }
  update(timestamp){
    this.start = this.start.update(timestamp);
    this.end = this.end.update(timestamp);
    return this;
  }
  getDrawPoint() {
    const vector = glMatrix.vec2.create();

    glMatrix.vec2.lerp(vector, this.start.getFulcrumPoint().vector, this.end.getFulcrumPoint().vector, 0.48);
    return vector;
  }
};

module.exports = Link;
