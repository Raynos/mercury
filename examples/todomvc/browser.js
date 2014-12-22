'use strict';

var hg = require('../../index.js');
var TimeTravel = require('../../time-travel.js');
var document = require('global/document');
var window = require('global/window');
var rafListen = require('./lib/raf-listen.js');
var localStorage = window.localStorage;

var TodoApp = require('./todo-app.js');

function App() {
    // load from localStorage
    var storedState = localStorage.getItem('todos-mercury@11');
    var initialState = storedState ? JSON.parse(storedState) : null;

    var todoApp = TodoApp(initialState);

    rafListen(todoApp, function onChange(value) {
        localStorage.setItem('todos-mercury@11',
            JSON.stringify(value));
    });

    return todoApp;
}

App.render = TodoApp.render;

var app = window.app = App();
var history = TimeTravel(app);
window.undo = history.undo;
window.redo = history.redo;
hg.app(document.body, app, App.render);

module.exports = App;
