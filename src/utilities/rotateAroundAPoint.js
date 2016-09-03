"use strict";

import Point from '../parts/Point.js';

export default function rotateAroundAPoint(fpr, point, center, clockwise) {
    const deltaX = point.x - center.x;
    const deltaY = point.y - center.y;
    const radius = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    const curTheta = Math.atan2(deltaY, deltaX);
    const circumfrence = 2 * Math.PI * radius;
    const distance = circumfrence/fpr;
    const deltaTheta = distance/radius;
    const newTheta = clockwise ? curTheta - deltaTheta : curTheta + deltaTheta;
    const newDeltaX = radius * Math.cos(newTheta);
    const newDeltaY = radius * Math.sin(newTheta);
    return new Point(center.x + newDeltaX, center.y + newDeltaY);
};
