var document = require('global/document');
var mercury = require('../index.js');
var h = mercury.h;

var clicks = mercury.input();
var state = mercury.value(0);

clicks(function onClick() {
    state.set(state() + 1);
});

function render(clickCount) {
    return h('div.counter', [
        'The state ', h('code', 'clickCount'),
        ' has value: ' + clickCount + '.', h('input.button', {
            type: 'button',
            value: 'Click me!',
            'ev-click': mercury.event(clicks)
        })
    ]);
}

mercury.app(document.body, state, render);
