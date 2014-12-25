'use strict';

var document = require('global/document');
var hg = require('../../index.js');
var virtualize = require('vdom-virtualize');
var JSONGlobals = require('json-globals/get');

function App(initialState) {
    return hg.state({
        description: hg.value(initialState.description || ''),
        items: hg.array(initialState.items || []),
        channels: {
            add: add
        }
    });
}

function add(state, data) {
    state.items.push({
        name: data.name
    });
}

App.render = require('./render.js');

var initialState = JSONGlobals('state');
var app = App(initialState);
var targetElem = document.body.firstChild;
var prevTree = virtualize(targetElem);

hg.app(null, app, App.render, {
    initialTree: prevTree,
    target: targetElem
});

app.set(app());
