"use strict";
import qs from 'qs';
import {createLinkFromUrlString} from '../parts/Link.js';
import {createDiskFromUrlString} from '../parts/Disk.js';
import {createDrawingSurfaceFromUrlString} from '../parts/DrawingSurface.js';

const creationMethods = {
    "L": createLinkFromUrlString,
    "D": createDiskFromUrlString,
    "S": createDrawingSurfaceFromUrlString
}

const ID_LENGTH = 36;

class Node {
    constructor(id, partInstructions) {
        this.partInstructions = partInstructions;
        this.id = id;
        this.depCount = this.countDeps(partInstructions);
        this.children = [];
    }
    countDeps(partString) {
        const instructArr = partString.substring(1, partString.length - 36).split('+');
        return instructArr.reduce((memo, item) => {
            if (item.length === ID_LENGTH) {
                memo++;
            } 
            return memo
        }, 0);
    }
    removeDep() {
        this.depCount--;
    }
    addChild(id) {
        this.children.push(id);
    }
    createPart(parts) {
        return creationMethods[this.partInstructions.charAt(0)](this.partInstructions, parts);
    }
}

export default function (queryString) {
    const parsedQuery = qs.parse(queryString);
    const parts = parsedQuery.parts.reduce((memo, part) => {
        const partId = part.substring(part.length - ID_LENGTH, part.length);
        memo[partId] = new Node(partId, part);
        return memo;
    }, {});
    const ids = Object.keys(parts);
    const returnParts = [];

    ids.forEach(id => {
        parsedQuery.parts.forEach(part => {
            // exclude its own id
            if(part.substring(0, part.length - ID_LENGTH).indexOf(id) !== -1) {
                parts[id].addChild(part.substring(part.length - ID_LENGTH, part.length));
            }
        });
    });

    ids.sort((a, b) => {
        if (parts[a].depCount > parts[b].depCount) {
            return -1;
        } else if (parts[a].depCount < parts[b].depCount) {
            return 1;
        }
        return 0;
    });
    let current
    debugger;
    while (ids.length) {
        debugger;
        current = ids.pop();
        if (parts[current].depCount === 0 ) {
            returnParts.push(parts[current].createPart(returnParts));
            parts[current].children.forEach((child) => {
                parts[child].removeDep();
            });
        } else {
            ids.unshift(current);
        }
    }
    return returnParts;
};
