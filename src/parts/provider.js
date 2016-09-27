"use strict";
import values from "lodash.values";
import constants from "../constants.js";
import Disk from './parts/Disk.js';
import Link from './parts/Link.js';
import Point from './parts/Point.js';
import DrawingSurface from './parts/DrawingSurface.js';
import {EventEmitter} from 'events';
import qs from 'qs';

const parts = {};

export default class Provider extends EventEmitter {
    get(id) {
        return parts[id];
    },
    set(part) {
        parts[part.partId] = part;
    },
    parts() {
        return values(parts);
    },
    clockwise(e) {
        this.addDisk(e.pageX, e.pageY, true);
    },
    counterclockwise(e) {
        this.addDisk(e.pageX, e.pageY, false);
    },
    addDisk(x, y, clockwise) {
        const disk = new Disk(x, y, constants.DEFAULT_RADIUS, {
            clockwise,
            rotationCenter: pageCenter,
            setByMouse: true
        });
        this.set(disk);
        disk.on('updateConfig', () => this.emit('update'));
    },
    addLink(e) {
        const link = new Link();
        this.parts().forEach((part) => {
            part.readyForLink();
            part.on('addedToLink', link.addPart.bind(link));
        });
        link.on('connected', () => {
            this.parts().forEach(part => part.unreadyForLink());
        });
        this.set(link);
        link.on('updateConfig', () => this.emit('update'));  
    },
    createUrlString() {
        document.location.hash = qs.stringify({
            parts: provider.parts().map((part) => {
                return part.createUrlString();
            })
        }); 
    },
    play() {

        this.createUrlString();
    },
    createSurface() {
        const drawingSurface = new DrawingSurface(link.partId);
        provider.set(drawingSurface);
    },
    update() {

    }

};
