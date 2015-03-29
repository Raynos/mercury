'use strict';

var hg = require('../../index.js');
var h = require('../../index.js').h;
var cuid = require('cuid');
var WeakmapEvent = require('../lib/weakmap-event.js');

var FocusHook = require('../lib/focus-hook.js');

var DestroyEvent = WeakmapEvent();
var ESCAPE = 27;

TodoItem.onDestroy = DestroyEvent.listen;
TodoItem.setCompleted = function setCompleted(s, x) {
    s.completed.set(x);
};
TodoItem.isCompleted = function isCompleted(s) {
    return s.completed();
};

module.exports = TodoItem;

function TodoItem(item) {
    item = item || {};

    return hg.state({
        id: hg.value(item.id || cuid()),
        title: hg.value(item.title || ''),
        editing: hg.value(item.editing || false),
        completed: hg.value(item.completed || false),
        channels: {
            toggle: toggle,
            startEdit: startEdit,
            cancelEdit: cancelEdit,
            finishEdit: finishEdit
        }
    });
}

function toggle(state, data) {
    state.completed.set(data.completed);
}

function startEdit(state) {
    state.editing.set(true);
}

function finishEdit(state, data) {
    if (state.editing() === false) {
        return;
    }

    state.editing.set(false);
    state.title.set(data.title);

    if (data.title.trim() === '') {
        DestroyEvent.broadcast(state, {
            id: state.id()
        });
    }
}

function cancelEdit(state) {
    state.editing.set(false);
}

var sneakyGlobal = {};

TodoItem.render = function render(todo, parentHandles) {
    var className = (todo.completed ? 'completed ' : '') +
        (todo.editing ? 'editing' : '');

    sneakyGlobal[todo.id] = todo;

    return h('li', { className: className, key: todo.id }, [
        h('.view', [
            h('input.toggle', {
                type: 'checkbox',
                checked: todo.completed,
                'ev-change': hg.send(todo.channels.toggle, {
                    completed: !todo.completed
                })
            }),
            h('label', {
                'ev-dblclick': hg.send(todo.channels.startEdit)
            }, todo.title),
            h('button.destroy', {
                'ev-click': hg.send(parentHandles.destroy, {
                    id: todo.id
                })
            })
        ]),
        h('input.edit', {
            value: todo.title,
            name: 'title',
            // when we need an RPC invocation we add a
            // custom mutable operation into the tree to be
            // invoked at patch time
            'ev-focus': todo.editing ? FocusHook() : null,
            'ev-keydown': hg.sendKey(
                todo.channels.cancelEdit, null, {key: ESCAPE}),
            'ev-event': hg.sendSubmit(todo.channels.finishEdit),
            'ev-blur': hg.sendValue(todo.channels.finishEdit)
        })
    ]);

};
