import Guid from 'guid';

export default class DrawingSurface {
    constructor(drawingTool) {
        this.drawingTool = drawingTool;
        this.pointList = [];
        this.path = 'M';
        this.type = 'DrawingSurface';
        this.partId = Guid.raw();
    }
    update(){
        const point = this.drawingTool.getDrawPoint();
        const pointString = this.path === 'M' ? `${point[0]},${point[1]}` : `,${point[0]},${point[1]}`;
        this.pointList.push(point);
        this.path += pointString;
    }
}

