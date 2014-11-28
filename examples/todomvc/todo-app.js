'use strict';

var hg = require('../../index.js');
var h = require('../../index.js').h;
var Router = require('../lib/router/');
var document = require('global/document');

var TodoItem = require('./todo-item.js');

var ROOT_URI = String(document.location.pathname);
var COMPLETED_URI = ROOT_URI + '/completed';
var ACTIVE_URI = ROOT_URI + '/active';

module.exports = TodoApp;

function TodoApp(opts) {
    opts = opts || {};

    var state = hg.state({
        todos: hg.varhash(opts.todos || {}, TodoItem),
        route: Router(),
        field: hg.struct({
            text: hg.value(opts.field && opts.field.text || '')
        }),
        handles: {
            setTodoField: setTodoField,
            add: add,
            clearCompleted: clearCompleted,
            toggleAll: toggleAll,
            destroy: destroy
        }
    });

    TodoItem.onDestroy.asHash(state.todos, function onDestroy(ev) {
        destroy(state, ev);
    });

    return state;
}

function setTodoField(state, data) {
    state.field.text.set(data.newTodo);
}

function add(state, data) {
    if (data.newTodo.trim() === '') {
        return;
    }

    var todo = TodoItem({
        title: data.newTodo.trim()
    });
    state.todos.put(todo.id(), todo);
    state.field.text.set('');
}

function clearCompleted(state) {
    Object.keys(state.todos).forEach(function clear(key) {
        if (state.todos[key].completed()) {
            destroy(state, state.todos[key]());
        }
    });
}

function toggleAll(state, value) {
    Object.keys(state.todos).forEach(function toggle(key) {
        state.todos[key].completed.set(value.toggle);
    });
}

function destroy(state, opts) {
    state.todos.delete(opts.id);
}

TodoApp.render = function render(state) {
    return h('.todomvc-wrapper', {
        style: { visibility: 'hidden' }
    }, [
        h('link', {
            rel: 'stylesheet',
            href: '/mercury/examples/todomvc/style.css'
        }),
        h('section#todoapp.todoapp', [
            hg.partial(header, state.field, state.handles),
            hg.partial(mainSection,
                state.todos, state.route, state.handles),
            hg.partial(statsSection,
                state.todos, state.route, state.handles)
        ]),
        hg.partial(infoFooter)
    ]);
};

function header(field, handles) {
    return h('header#header.header', {
        'ev-event': [
            hg.changeEvent(handles.setTodoField),
            hg.submitEvent(handles.add)
        ]
    }, [
        h('h1', 'Todos'),
        h('input#new-todo.new-todo', {
            placeholder: 'What needs to be done?',
            autofocus: true,
            value: field.text,
            name: 'newTodo'
        })
    ]);
}

function mainSection(todos, route, handles) {
    var todosList = objectToArray(todos);

    var allCompleted = todosList.every(function isComplete(todo) {
        return todo.completed;
    });
    var visibleTodos = todosList.filter(function isVisible(todo) {
        return route === COMPLETED_URI && todo.completed ||
            route === ACTIVE_URI && !todo.completed ||
            route === ROOT_URI;
    });

    return h('section#main.main', { hidden: !todosList.length }, [
        h('input#toggle-all.toggle-all', {
            type: 'checkbox',
            name: 'toggle',
            checked: allCompleted,
            'ev-change': hg.valueEvent(handles.toggleAll)
        }),
        h('label', { htmlFor: 'toggle-all' }, 'Mark all as complete'),
        h('ul#todo-list.todolist', visibleTodos
            .map(function renderItem(todo) {
                return TodoItem.render(todo, handles);
            }))
    ]);
}

function statsSection(todos, route, handles) {
    var todosList = objectToArray(todos);
    var todosLeft = todosList.filter(function notComplete(todo) {
        return !todo.completed;
    }).length;
    var todosCompleted = todosList.length - todosLeft;

    return h('footer#footer.footer', {
        hidden: !todosList.length
    }, [
        h('span#todo-count.todo-count', [
            h('strong', String(todosLeft)),
            todosLeft === 1 ? ' item' : ' items',
            ' left'
        ]),
        h('ul#filters.filters', [
            link(ROOT_URI, 'All', route === ROOT_URI),
            link(ACTIVE_URI, 'Active', route === ACTIVE_URI),
            link(COMPLETED_URI, 'Completed',
                route === COMPLETED_URI)
        ]),
        h('button.clear-completed#clear-completed', {
            hidden: todosCompleted === 0,
            'ev-click': hg.event(handles.clearCompleted)
        }, 'Clear completed (' + String(todosCompleted) + ')')
    ]);
}

function link(uri, text, isSelected) {
    return h('li', [
        Router.anchor({
            className: isSelected ? 'selected' : '',
            href: uri
        }, text)
    ]);
}

function infoFooter() {
    return h('footer#info.info', [
        h('p', 'Double-click to edit a todo'),
        h('p', [
            'Written by ',
            h('a', { href: 'https://github.com/Raynos' }, 'Raynos')
        ]),
        h('p', [
            'Part of ',
            h('a', { href: 'http://todomvc.com' }, 'TodoMVC')
        ])
    ]);
}

function objectToArray(obj) {
    return Object.keys(obj).map(function toItem(k) {
        return obj[k];
    });
}
