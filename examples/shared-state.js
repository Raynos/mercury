var document = require('global/document');
var mercury = require('../index.js');
var h = mercury.h;

var events = mercury.input(['change']);
var state = mercury.value('');

events.change(function onchange(data) {
    state.set(data.text);
});

function inputBox(value, sink) {
    return h('input.input', {
        value: value,
        name: 'text',
        type: 'text',
        'ev-event': mercury.changeEvent(sink)
    });
}

function render(textValue) {
    return h('div', [
        h('p.content', 'The value is now: ' + textValue),
        h('p', [
            'Change it here: ',
            inputBox(textValue, events.change)
        ])
    ]);
}

mercury.app(document.body, state, render);
