import constants from '../constants.js';
import Point from './Point.js';
import Guid from 'guid';
import rotateAroundAPoint from '../utilities/rotateAroundAPoint.js';
import PartPlacer from '../utilities/PartPlacer.js';
import {EventEmitter} from 'events';
import distanceFormula from '../utilities/distanceFormula.js';

export default class Disk extends EventEmitter {
  constructor (x, y, radius, options) {
    super();
    options = options || {};
    this.clockwise = options.clockwise || true;
    this.millisecondsPerRotation = options.millisecondsPerRotation || 1000;
    this.rotationCenter = options.rotationCenter;
    this.diskRotationSpeed = options.speedAroundCenter || 3000;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.points = [];
    this.partId = options.partId || Guid.raw();
    this.type = 'Disk';
    this.fillColor = "transparent";
    if (options.setByMouse) { 
      this.setByMouse();
    } else {
      this.addPoint(new Point(x+radius, y));
    }
  }

  createUrlString() {
    return "D" + Number(this.clockwise) + "+" + 
      this.millisecondsPerRotation + "+" + 
      this.rotationCenter.x + "_" + this.rotationCenter.y + "+" +
      this.diskRotationSpeed + "+" +
      this.radius + "+" +
      this.x + "+" +
      this.y + "+" +
      this.partId;
  }

  setMPR(mpr) {
    this.millisecondsPerRotation = mpr;
  }

  setByMouse() {
    this.partPlacer = new PartPlacer();
    this.partPlacer.on('positionUpdate', this.positionUpdate.bind(this));
    this.partPlacer.on('positionChoose', this.positionChoose.bind(this));
  }

  positionChoose(x, y) {
    this.positionUpdate(x, y);
    this.unbindPartPlacer();
    this.partPlacer.on('positionUpdate', this.radiusUpdate.bind(this));
    this.partPlacer.on('positionChoose', this.finishPositionSet.bind(this));
  }

  unbindPartPlacer() {
    this.partPlacer.removeAllListeners('positionUpdate');
    this.partPlacer.removeAllListeners('positionChoose');
  }

  radiusUpdate(x, y) {
    this.radius = distanceFormula([x,y], [this.x, this.y]);
    this.emit('updateConfig');
  }

  finishPositionSet(x, y) {
    this.radiusUpdate(x, y);
    this.unbindPartPlacer();
    this.partPlacer.removeEvents();
    this.partPlacer = null;
    this.emit('updateConfig');
  }

  positionUpdate(x, y) {
    this.x = x;
    this.y = y;
    this.emit('updateConfig');
  }

  centerFpr(elapsed) {
    return this.diskRotationSpeed/elapsed;
  }

  rotateDiskAroundCenter() {
    const newPoints = rotateAroundAPoint(this.centerFpr(10), {x: this.x, y: this.y}, this.rotationCenter, true);
    this.x = newPoints.x;
    this.y = newPoints.y;
  }

  getFulcrumPoint() {
    return this.points[0];
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
    this.emit('updateConfig');
    return this;
  }

  rotatePoints (elapsedTime) {
    const fpr = this.calculateFramesPR(elapsedTime);
    return this.points.map(this.rotatePoint.bind(this, fpr));
  }

  rotatePoint (fpr, point) {
    return rotateAroundAPoint(fpr, point, {x: this.x, y: this.y}, this.clockwise);
  }

  update (timestamp) {
    this.rotateDiskAroundCenter();
    this.points = this.points.map((point) => {
        return rotateAroundAPoint(this.centerFpr(10), point, this.rotationCenter, true);
    });
    this.points = this.rotatePoints(10);
    return this;
  }

  readyForLink() {
    this.isReadyForLink = true;
  }

  unreadyForLink() {
    this.isReadyForLink = false;
  }

  setFillColor(color) {
    this.fillColor = color;
    this.emit('updateConfig');
  }

  addToLink() {
    this.isReadyForLink = false;
    this.addPoint(new Point(this.x + this.radius, this.y))
    this.emit('addedToLink', this.partId);
  }

};

export const createDiskFromUrlString = function (queryString) {
  let [
    clockwise,
    millisecondsPerRotation,
    rotationCenter,
    diskRotationSpeed,
    radius,
    x,
    y,
    partId
  ] = queryString.substr(1, queryString.length).split('+');
  rotationCenter = rotationCenter.split('_');
  const options = {
    clockwise: !!clockwise,
    millisecondsPerRotation: Number(millisecondsPerRotation),
    rotationCenter: new Point(Number(rotationCenter[0]), Number(rotationCenter[1])),
    diskRotationSpeed: Number(diskRotationSpeed),
    partId
  };
  return new Disk(Number(x), Number(y), Number(radius), options);
};
