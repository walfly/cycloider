import Guid from 'guid';
import provider from './provider.js';

export default class DrawingSurface {
    constructor(drawingTool, id) {
        this.drawingTool = drawingTool;
        this.path = 'M';
        this.type = 'DrawingSurface';
        this.partId = id || Guid.raw();
    }
    createUrlString() {
        return "S" + provider.get(this.drawingTool).partId + "+" +
        this.partId; 
    }
    update(){
        const point = provider.get(this.drawingTool).getDrawPoint();
        const pointString = this.path === 'M' ? `${point[0]},${point[1]}` : `,${point[0]},${point[1]}`;
        this.path += pointString;
    }
}

export const createDrawingSurfaceFromUrlString = function (queryString) {
  const [
    drawingToolId,
    partId
  ] = queryString.substr(1, queryString.length).split('+');

  return new DrawingSurface(drawingToolId, partId);
};
