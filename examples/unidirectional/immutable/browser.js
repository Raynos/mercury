'use strict';

var document = require('global/document');
var mercury = require('../../../index.js');
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

var appState = Cursor.from(data);

events.add(function add(newItem) {
    appState.update('items', function pushItem(items) {
        return items.push(Immutable.fromJS(newItem));
    });
});

function render(state) {
    return h('div', [
        h('h2', state.get('description')),
        h('ul', state.get('items').map(function toitem(item) {
            return h('li', {
                key: item.cid,
                style: { color: item.get('color') }
            }, [
                h('span', item.get('name')),
                h('input', { value: item.get('value') })
            ]);
        }).toArray()),
        h('div', {
            'ev-event': mercury.submitEvent(state.getIn(['events', 'add']))
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
            return cursor.deref();
        }

        cursor._onChange = function onChange(newData) {
            cursor._rootData = newData;
            listener(newData);
        };
    };
}

mercury.app(document.body, toObserv(appState), render);
