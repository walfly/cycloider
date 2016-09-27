import React from 'react';
import ReactDom from 'react-dom';
import provider from './parts/provider.js'
import App from './reactComponents/App.jsx';
import ControlsApp from './reactComponents/ControlsApp.jsx';
import constants from './constants.js';
import PartDetails from './reactComponents/PartDetails.jsx';
import readUrl from './utilities/readUrl.js';

const width = window.innerWidth;
const height = window.innerHeight;

const pageCenter = new Point(width/2, height/2);

if(document.location.hash){
  parts = readUrl(document.location.hash.substring(1, document.location.hash.length)); 
}

const drawingPlaneUpdate = function () {
  app.setState({parts: provider.parts()});
  details.setState({parts: provider.parts()});
};

const createSurface = function(link) {

};


const update = function () {
  provider.parts().forEach(part => part.update());
  drawingPlaneUpdate();
};

const play = function () {
  document.location.hash = qs.stringify({ parts: provider.parts().map((part) => { return part.createUrlString(); })});
  setInterval(update, 16);
};

const app = ReactDom.render(<App width={width}
                                 height={height}
                                 parts={provider.parts()} />,
                                 document.getElementById('app'));

const details = ReactDom.render(<PartDetails parts={provider.parts()} />,
                                 document.getElementById('details'));

const controls = ReactDom.render(<ControlsApp onClockwise={provider.clockwise.bind(provider)}
                                              onCounterclockwise={provider.counterclockwise.bind(provider)}
                                              onLink={provider.addLink.bind(this)}
                                              onPlay={play}/>,
                                              document.getElementById('controls'));

