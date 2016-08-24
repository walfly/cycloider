import React from 'react';
import ReactDom from 'react-dom';
import FulcrumDisk from './parts/FulcrumDisk.js';
import Disk from './parts/Disk.js';
import Link from './parts/Link.js';
import Point from './parts/Point.js';
import DrawingSurface from './parts/DrawingSurface.js';
import App from './reactComponents/App.jsx';

const width = window.innerWidth;
const height = window.innerHeight;

const disk1 = new FulcrumDisk(235, 435, 265, {
  millisecondsPerRotation: 2323,
  rotationCenter: new Point(width/2, height/2),
  speedAroundCenter: 4000
});

const disk2 = new FulcrumDisk(width - 103, height - 103, 103, {
  millisecondsPerRotation: 534,
  rotationCenter: new Point(width/2, height/2),
  speedAroundCenter: 4000
});

const link = new Link(disk1, disk2, 500);

const drawingSurface = new DrawingSurface(link);

const parts = [
  disk1,
  disk2,
  link,
  drawingSurface
];

const app = ReactDom.render(<App width={width} height={height} parts={parts} />, document.getElementById('app'));

const update = function () {
  parts.forEach(part => part.update());
  app.setState({parts: parts});
};
// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// var linkGroup = svg.append('g');
// var cycleGroup = svg.append('g');

// var linearFunction = d3.svg.line()
//                            .x(function(d){return d.x})
//                            .y(function(d){return d.y})
//                            .interpolate('basis');

// function update (timestamp) {
//   disk1.rotateDiskAroundCenter();
//   disk2.rotateDiskAroundCenter();
//   link.update(timestamp);
//   var drawingPoint = link.getDrawPoint();
//   drawing.push(new Point(drawingPoint[0], drawingPoint[1]));

//   var dp = linkGroup.selectAll('circle')
//             .data([
//               drawingPoint,
//               [disk1.x, disk1.y],
//               [disk2.x, disk2.y], 
//               [disk1.getFulcrumPoint().x, disk1.getFulcrumPoint().y],
//               [disk2.getFulcrumPoint().x, disk2.getFulcrumPoint().y]
//               ]);

//   dp.enter().append('circle')
//             .attr('r', 10)
//             .style('fill', 'red');
  
//   dp.attr('cx', function(d) {return d[0]})
//     .attr('cy', function(d) {return d[1]});

//   dp.exit().remove();

//   cycleGroup.selectAll('path').remove();


//   cycleGroup.append('path').datum(drawing)
//                            .attr('d', linearFunction)
//                            .style('fill', 'none')
//                            .style('stroke', "#000")
//                            .attr('stroke-width', 1);

//   var links = linkGroup.selectAll("line")
//            .data([link]);

//   links.enter()
//            .append('line')
//            .attr("stroke-width", 5)
//            .style("stroke", 'blue');

//   links.exit().remove();

//   links.attr("x1", function (d) { return d.start.getFulcrumPoint().x; })
//         .attr("y1", function (d) { return d.start.getFulcrumPoint().y; })
//         .attr("x2", function (d) { return d.end.getFulcrumPoint().x; })
//         .attr("y2", function (d) { return d.end.getFulcrumPoint().y; });

//   // window.requestAnimationFrame(update);
// };

setInterval(update, 16);

// window.requestAnimationFrame(update);
