import glMatrix from 'gl-matrix';
import Guid from 'guid';
import Point from './Point.js';
import {EventEmitter} from 'events';
import PartPlacer from '../utilities/PartPlacer.js';

const scratch = Array.apply(null, {length: 5}).map((item) => {
  return glMatrix.vec2.create();
});

export default class Link extends EventEmitter {
  constructor(startFulcrum, endFulcrum, drawingDist){
    super();
    this.startFulcrum = startFulcrum;
    this.endFulcrum = endFulcrum;
    this.drawingDist = drawingDist;
    this.type = "Link";
    this.partId = Guid.raw();
  }
  createUrlString() {
    return "L" + this.startFulcrum.partId + "+" +
           this.endFulcrum.partId + "+" +
           this.drawingDist;
  }
  start() {
    if (this.startFulcrum) {
      return this.startFulcrum.points[0];
    }
  }
  end() {
    if (this.endFulcrum) {
      return this.endFulcrum.points[0];
    }
  }
  addPart(part) {
    if (!this.startFulcrum) {
      this.startFulcrum = part;
      this.partPlacer = new PartPlacer();
      this.partPlacer.on('positionUpdate', this.moveEnd.bind(this));
    } else {
      this.endFulcrum = part;
      this.unbindPartPlacer();
      this.partPlacer.on('positionUpdate', this.moveDraw.bind(this));
      this.partPlacer.on('positionChoose', this.chooseDraw.bind(this));
    }
  }
  setDrawingDist() {

  }
  chooseDraw(x, y) {
    const cp = this.closestPoint(x, y);
    this.drawingDist = glMatrix.vec2.dist(cp, this.start().vector);
    this.unbindPartPlacer();
    this.partPlacer.removeEvents();
    this.partPlacer = null;
    this.emit('update');
    this.emit('choseDrawpoint');
  }
  moveDraw(x, y) {
    const cp = this.closestPoint(x, y);
    this.drawingDist = glMatrix.vec2.dist(cp, this.start().vector);
    this.emit('update');
  }
  closestPoint(x,y) {
    const point = glMatrix.vec2.set(scratch[0], x, y);
    const pointStart = glMatrix.vec2.sub(scratch[1], point, this.start().vector);
    const line = glMatrix.vec2.sub(scratch[2], this.end().vector, this.start().vector);
    const lineSqrd = glMatrix.vec2.squaredLength(line);
    const ps_li = (pointStart[0] * line[0]) + (pointStart[1] * line[1])
    let t = ps_li / lineSqrd;
    if (t < 0) {
      t = 0;
    } else if (t > 1) {
      t = 1
    }
    return glMatrix.vec2.scaleAndAdd(scratch[0], this.start().vector, line, t);
  }
  unbindPartPlacer() {
    this.partPlacer.removeAllListeners('positionUpdate');
    this.partPlacer.removeAllListeners('positionChoose');
  }
  moveEnd(x, y) {
    this.endFulcrum = {
      points: [new Point(x,y)]
    };
    this.emit('update');
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

export const createFromUrlString = function (queryString, parts) {
  const [
    startId,
    endId,
    drawingDist
  ] = queryString.substr(1, queryString.length).split('+');

  const start = parts.find((part) => {
    return part.partId === startId;
  });

  const end = parts.find((part) => {
    return part.partId === endId;
  });

  return new Link(start, end, Number(drawingDist));
};
