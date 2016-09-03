import React from 'react';
import ReactDom from 'react-dom';
import Disk from './parts/Disk.js';
import Link from './parts/Link.js';
import Point from './parts/Point.js';
import DrawingSurface from './parts/DrawingSurface.js';
import App from './reactComponents/App.jsx';
import ControlsApp from './reactComponents/ControlsApp.jsx';
import constants from './constants.js';
import PartDetails from './reactComponents/PartDetails.jsx';

const width = window.innerWidth;
const height = window.innerHeight;

const pageCenter = new Point(width/2, height/2);

const parts = [];

const drawingPlaneUpdate = function () {
  app.setState({parts: parts});
  details.setState({parts: parts});
};

const clockwise = function (e) {
  addDisk(e.pageX, e.pageY, true);
};

const counterclockwise = function (e) {
  addDisk(e.pageX, e.pageY, false);
};

const addDisk = function(x, y, clockwise) {
  const disk = new Disk(x, y, constants.DEFAULT_RADIUS, {
    clockwise,
    rotationCenter: pageCenter,
    setByMouse: true
  });
  parts.push(disk);
  disk.on('update', drawingPlaneUpdate);
};

const createSurface = function(link) {
  const drawingSurface = new DrawingSurface(link);
  parts.push(drawingSurface);
};

const addLink = function(e) {
  const link = new Link();
  parts.forEach((part) => {
    part.readyForLink();
    part.on('addedToLink', link.addPart.bind(link));
  });
  parts.push(link);
  link.on('update', drawingPlaneUpdate);
  link.on('choseDrawpoint', createSurface.bind(null, link));
};

const update = function () {
  parts.forEach(part => part.update());
  drawingPlaneUpdate();
};

const play = function () {
  setInterval(update, 16);
};

const app = ReactDom.render(<App width={width}
                                 height={height}
                                 parts={parts} />,
                                 document.getElementById('app'));

const details = ReactDom.render(<PartDetails parts={parts} />,
                                 document.getElementById('details'));

const controls = ReactDom.render(<ControlsApp onClockwise={clockwise}
                                              onCounterclockwise={counterclockwise}
                                              onLink={addLink}
                                              onPlay={play}/>,
                                              document.getElementById('controls'));

