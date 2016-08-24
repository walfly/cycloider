import glMatrix from 'gl-matrix';
import Guid from 'guid';

export default class Link {
  constructor(startFulcrum, endFulcrum, drawingDist){
    this.startFulcrum = startFulcrum;
    this.endFulcrum = endFulcrum;
    this.type = "Link";
    this.partId = Guid.raw();
  }
  start() {
    return this.startFulcrum.points[0];
  }
  end() {
    return this.endFulcrum.points[0];
  }
  update(timestamp){
    return this;
  }
  getDrawPoint() {
    const vector = glMatrix.vec2.create();

    glMatrix.vec2.lerp(vector, this.startFulcrum.getFulcrumPoint().vector, this.endFulcrum.getFulcrumPoint().vector, 0.48);
    return vector;
  }
};
