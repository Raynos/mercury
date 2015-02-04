'use strict';

var document = require('global/document');
var mercury = require('../../../index.js');
var cuid = require('cuid');
var h = mercury.h;

var Immutable = require('immutable');
var Cursor = require('immutable/contrib/cursor');

var events = mercury.input(['add']);

var data = Immutable.fromJS({
    description: 'app state description',
    items: [
        { name: 'one', value: 'first', color: 'red' },
        { name: 'two', value: 'second', color: 'blue' }
    ],
    events: events
});

var state = Cursor.from(data);

events.add(function add(data) {
    state.update('items', function pushItem(items) {
        return items.push(Immutable.fromJS(data));
    });
});

function render(state) {
    return h('div', [
        h('h2', state.description),
        h('ul', state.items.map(function toItem(item) {
            return h('li', {
                key: item.cid,
                style: { color: item.color }
            }, [
                h('span', item.name),
                h('input', { value: item.value })
            ]);
        })),
        h('div', {
            'ev-event': mercury.submitEvent(state.events.add)
        }, [
            h('input', {
                name: 'name',
                placeholder: 'name'
            }),
            h('input', {
                name: 'value',
                placeholder: 'value'
            }),
            h('input', {
                name: 'color',
                placeholder: 'color'
            }),
            h('button', 'add')
        ])
    ]);
}

function toObserv(cursor) {
    return function observ(listener) {
        if (!listener) {
            return cursor.deref().toJS();
        }

        cursor._onChange = function onChange(data) {
            cursor._rootData = data;
            listener(data.toJS());
        };
    };
}

mercury.app(document.body, toObserv(state), render);

