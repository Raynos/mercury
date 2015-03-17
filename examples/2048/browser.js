'use strict';

var mercury = require('../../index.js');
var window = require('global/window');

var Input = require('./input.js');
var Render = require('./render.js');
var State = require('./state.js');
var Update = require('./update.js');

module.exports = createApp;

var state = window.state = createApp();
mercury.app(document.body, state, Render);

function createApp() {
    var initialState = null;

    var events = Input();
    var state = State.game(events, initialState);

    wireUpEvents(state, events);

    // resetGame() to initial position
    Update.resetGame(state);

    return state;
}

function wireUpEvents(state, events) {
    events.resetGame(Update.resetGame.bind(null, state));
    events.move(Update.move.bind(null, state));
}
