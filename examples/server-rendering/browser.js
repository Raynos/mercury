'use strict';

var document = require('global/document');
var extend = require('xtend');
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

var app = App(JSONGlobals('state'));
var targetElem = document.body.firstChild;
var prevTree = virtualize(targetElem);

var opts = {
    initialTree: prevTree,
    target: targetElem
};

hg.Delegator(opts);

var loop = hg.main(app, App.render, extend({
    diff: hg.diff,
    create: hg.create,
    patch: hg.patch
}, opts));

app(loop.update);
app.set(app());
