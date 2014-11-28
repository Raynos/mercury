'use strict';

// circular dependency.
module.exports = State;

var cuid = require('cuid');
var hg = require('../../index.js');

var Router = require('../lib/router/');
var Update = require('./update.js');

State.TodoItem = TodoItem;

function State(state) {
    state = state || {};

    return hg.state({
        todos: hg.array((state.todos || []).map(TodoItem)),
        route: Router(),
        field: hg.struct({
            text: hg.value(state.field.text || '')
        }),
        handles: Update
    });
}

function TodoItem(item) {
    item = item || {};

    return hg.struct({
        id: cuid(),
        title: hg.value(item.title || ''),
        editing: hg.value(item.editing || false),
        completed: hg.value(item.completed || false)
    });
}
