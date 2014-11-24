'use strict';

var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;

function App() {
    return hg.state({
        text: hg.value(''),
        handles: {
            change: setText
        }
    });
}

function setText(state, data) {
    state.text.set(data.text);
}

App.render = function render(state) {
    return h('div', [
        h('p.content', 'The value is now: ' + state.text),
        h('p', [
            'Change it here: ',
            inputBox(state.text, state.handles.change)
        ])
    ]);
};

function inputBox(value, sink) {
    return h('input.input', {
        value: value,
        name: 'text',
        type: 'text',
        'ev-event': hg.changeEvent(sink)
    });
}

hg.app(document.body, App(), App.render);
