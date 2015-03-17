'use strict';

var mercury = require('../../index.js');
var extend = require('xtend');

var Game2048 = {
    size: 4,
    grid: [],
    currentScore: 0,
    highScore: 0,
    defaultTileValue: 2,
    startingTiles: 2
};

module.exports = {
    game: gameBoard
};

function gameBoard(events, initialState) {
    var state = extend(Game2048, initialState);

    if (state.grid.length === 0) {
        for (var i = 0; i < state.size * state.size; i++) {
            state.grid[i] = null;
        }
    }

    return mercury.hash({
        events: events,
        grid: mercury.array(state.grid),
        size: mercury.value(state.size),
        currentScore: mercury.value(state.currentScore),
        highScore: mercury.value(state.highScore),
        defaultTileValue: mercury.value(state.defaultTileValue),
        startingTiles: mercury.value(state.startingTiles)
    });
}
