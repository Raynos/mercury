'use strict';

module.exports = {
    indexToPosition: indexToPosition
};

function indexToPosition(size, index) {
    var x = index % size;
    var y = (index - x) / size;

    return [x, y];
}

// [a, b, c, d]
// [null, null, null, tile] => [tile, null, null, null]

// [a, E, E, d]
