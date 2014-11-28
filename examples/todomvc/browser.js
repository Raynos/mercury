'use strict';

var hg = require('../../index.js');
var TimeTravel = require('../../time-travel.js');
var document = require('global/document');
var window = require('global/window');
var rafListen = require('./lib/raf-listen.js');
var localStorage = window.localStorage;

var State = require('./state.js');

function App() {
    // load from localStorage
    var storedState = localStorage.getItem('todos-mercury');
    var initialState = storedState ? JSON.parse(storedState) : null;

    var state = State(initialState);

    rafListen(state, function onChange(value) {
        localStorage.setItem('todos-mercury',
            JSON.stringify(value));
    });

    return state;
}

App.render = require('./render.js');

var app = App();
var history = TimeTravel(app);
window.undo = history.undo;
window.redo = history.redo;
hg.app(document.body, app, App.render);

module.exports = App;
