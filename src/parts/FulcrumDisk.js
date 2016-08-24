import Disk from './Disk.js';
import Point from './Point.js';

export default class FulcrumDisk extends Disk {
  constructor(x, y, radius, options) {
    super(x, y, options);
    this.rotationCenter = options.rotationCenter;
    this.diskRotationSpeed = options.speedAroundCenter;
    this.radius = radius;
    this.addPoint(new Point(x+radius, y));
  }
  centerFpr(elapsed) {
    return this.diskRotationSpeed/elapsed;
  }
  rotateDiskAroundCenter() {
    const newPoints = this.rotateAroundAPoint(this.centerFpr(32), {x: this.x, y: this.y}, this.rotationCenter, true);
    this.x = newPoints.x;
    this.y = newPoints.y;
  }
  getFulcrumPoint() {
    return this.points[0];
  }
  update() {
    this.rotateDiskAroundCenter();
    this.points = this.points.map((point) => {
        return this.rotateAroundAPoint(this.centerFpr(32), point, this.rotationCenter, true);
    });
    return super.update();
  }
};
