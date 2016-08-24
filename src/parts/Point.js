import glMatrix from 'gl-matrix';

export default class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vector = glMatrix.vec2.set(glMatrix.vec2.create(), x, y); 
    }

    getX() {
        return this.x;
    }
};
