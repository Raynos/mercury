'use strict';

Point.dist = dist;

module.exports = Point;

function Point(x, y) {
    return [x, y];
}

function dist(p1, p2) {
    return Math.sqrt(
        Math.pow(p1[0] - p2[0], 2) +
        Math.pow(p1[1] - p2[1], 2)
    );
}
