const Disk = require('./Disk.js');
const Point = require('./Point.js');

class FulcrumDisk extends Disk {
  constructor(x, y, radius, options) {
    super(x, y, options);
    this.addPoint(new Point(x+radius, y));
  }
  getFulcrumPoint() {
    return this.points[0];
  }
};

module.exports = FulcrumDisk;