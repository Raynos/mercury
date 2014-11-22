'use strict';

var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;

function App() {
    var state = hg.struct({
        value: hg.value(0),
        handles: hg.value(null)
    });

    state.handles.set(hg.handles({
        clicks: incrementCounter
    }, state));

    return state;
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

function incrementCounter(state) {
    state.value.set(state.value() + 1);
}

hg.app(document.body, App(), App.render);
