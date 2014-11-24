'use strict';

var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;

function App() {
    return hg.state({
        value: hg.value(0),
        handles: {
            clicks: incrementCounter
        }
    });
}

function incrementCounter(state) {
    state.value.set(state.value() + 1);
}

App.render = function render(state) {
    return h('div.counter', [
        'The state ', h('code', 'clickCount'),
        ' has value: ' + state.value + '.', h('input.button', {
            type: 'button',
            value: 'Click me!',
            'ev-click': hg.event(state.handles.clicks)
        })
    ]);
};

hg.app(document.body, App(), App.render);
