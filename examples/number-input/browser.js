var mercury = require('../../index.js')
var h = mercury.h;

var numberInput = require('./number-component.js')

// main.js
var state = mercury.struct({
    red: numberInput().state,
    blue: numberInput().state,
    green: numberInput().state
});

function render(state) {
    function numberspanny(name, state) {
        return h('span', [
            name,
            numberInput.Render(state)
        ]);
    }

    return h('div', [
        numberspanny('red', state.red),
        numberspanny('blue', state.blue),
        numberspanny('green', state.green)
    ]);
}

mercury.app(document.body, state, render);
