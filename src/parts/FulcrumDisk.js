const Disk = require('./Disk.js');
const Point = require('./Point.js');

class FulcrumDisk extends Disk {
  constructor(x, y, radius, options) {
    super(x, y, options);
    this.rotationCenter = options.rotationCenter;
    this.diskRotationSpeed = options.speedAroundCenter;
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
};

module.exports = FulcrumDisk;
