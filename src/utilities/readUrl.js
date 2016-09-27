"use strict";
import qs from 'qs';
import {createLinkFromUrlString} from '../parts/Link.js';
import {createDiskFromUrlString} from '../parts/Disk.js';
import {createDrawingSurfaceFromUrlString} from '../parts/DrawingSurface.js';
import provider from '../parts/provider.js';
const creationMethods = {
    "L": createLinkFromUrlString,
    "D": createDiskFromUrlString,
    "S": createDrawingSurfaceFromUrlString
}

export default function (queryString) {
    const parsedQuery = qs.parse(queryString);
    parsedQuery.parts.forEach(part => provider.set(creationMethods[part.charAt(0)](part)));
};
