import glMatrix from 'gl-matrix';
import Guid from 'guid';

export default class Link {
  constructor(startFulcrum, endFulcrum, drawingDist){
    this.startFulcrum = startFulcrum;
    this.endFulcrum = endFulcrum;
    this.drawingDist = drawingDist;
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
    const vectors = [0,0].map(() => { 
      return glMatrix.vec2.create();
    });
    glMatrix.vec2.sub(vectors[0], this.endFulcrum.getFulcrumPoint().vector, this.startFulcrum.getFulcrumPoint().vector);
    glMatrix.vec2.normalize(vectors[1], vectors[0]);
    glMatrix.vec2.scale(vectors[0], vectors[1], this.drawingDist);
    glMatrix.vec2.add(vectors[1], this.startFulcrum.getFulcrumPoint().vector, vectors[0])
    return vectors[1];
  }
};
