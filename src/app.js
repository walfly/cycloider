var d3 = require('d3');
var Disk = require('./parts/Disk.js');
var Point = require('./parts/Point.js');
var width = window.innerWidth;
var height = window.innerHeight;

var disk = new Disk(50, 50);
var point = new Point(60, 60);
disk.addPoint(point);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var diskGroup = svg.append('g');

function update () {
  disk.update();
  var points = diskGroup.selectAll("circle")
           .data(disk.points);

  points.enter()
           .append('circle')
           .attr("r", 2)
           .style("fill", 'blue');
  points.attr("cx", function (d) { return d.x; })
           .attr("cy", function (d) { return d.y; });
};

update();

setInterval(update, 32);

