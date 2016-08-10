var d3 = require('d3');
var FulcrumDisk = require('./parts/FulcrumDisk.js');
var Disk = require('./parts/Disk.js');
var Link = require('./parts/Link.js');
var Point = require('./parts/Point.js');
var width = window.innerWidth;
var height = window.innerHeight;

var disk1 = new FulcrumDisk(50, 50, 100, {clockwise: false, millisecondsPerRotation: 325});
var disk2 = new FulcrumDisk(width - 150, height - 350, 150, {millisecondsPerRotation: 666});
var link = new Link(disk1, disk2);
var drawingDisk = new Disk(width/2 + 75, height/2, {millisecondsPerRotation: 2333});

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var linkGroup = svg.append('g');
var cycleGroup = svg.append('g');

var linearFunction = d3.svg.line()
                           .x(function(d){return d.x})
                           .y(function(d){return d.y})
                           .interpolate('basis');

function update (timestamp) {
  link.update(timestamp);
  drawingDisk.update(timestamp);
  var drawingPoint = link.getDrawPoint();
  drawingDisk.addPoint(new Point(drawingPoint[0], drawingPoint[1]));

  var dp = linkGroup.selectAll('circle')
            .data([drawingPoint]);

  dp.enter().append('circle')
            .attr('r', 10)
            .style('fill', 'red');
  
  dp.attr('cx', function(d) {return d[0]})
    .attr('cy', function(d) {return d[1]});

  dp.exit().remove();

  cycleGroup.selectAll('path').remove();


  cycleGroup.append('path').datum(drawingDisk.points)
                           .attr('d', linearFunction)
                           .style('fill', 'none')
                           .style('stroke', "#000")
                           .attr('stroke-width', 1);

  var links = linkGroup.selectAll("line")
           .data([link]);

  links.enter()
           .append('line')
           .attr("stroke-width", 5)
           .style("stroke", 'blue');

  links.exit().remove();

  links.attr("x1", function (d) { return d.start.getFulcrumPoint().x; })
        .attr("y1", function (d) { return d.start.getFulcrumPoint().y; })
        .attr("x2", function (d) { return d.end.getFulcrumPoint().x; })
        .attr("y2", function (d) { return d.end.getFulcrumPoint().y; });

  // window.requestAnimationFrame(update);
};

setInterval(update, 32);

// window.requestAnimationFrame(update);
