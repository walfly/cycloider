import Guid from 'guid';

export default class DrawingSurface {
    constructor(drawingTool, id) {
        this.drawingTool = drawingTool;
        this.path = 'M';
        this.type = 'DrawingSurface';
        this.partId = id || Guid.raw();
    }
    createUrlString() {
        return "S" + this.drawingTool.partId + "+" +
        this.partId; 
    }
    update(){
        const point = this.drawingTool.getDrawPoint();
        const pointString = this.path === 'M' ? `${point[0]},${point[1]}` : `,${point[0]},${point[1]}`;
        this.path += pointString;
    }
}

export const createDrawingSurfaceFromUrlString = function (queryString, parts) {
  const [
    drawingToolId,
    partId
  ] = queryString.substr(1, queryString.length).split('+');
  const drawingTool = parts.find((part) => {
    return part.partId === drawingToolId;
  });
  return new DrawingSurface(drawingTool, partId);
};
