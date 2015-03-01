'use strict';

var hg = require('../../index.js');
var document = require('global/document');
var h = hg.h;

var NumberInput = require('./number-component.js');

function App() {
    return hg.state({
        red: NumberInput(),
        blue: NumberInput(),
        green: NumberInput()
    });
}

App.render = function render(state) {
    function numberspanny(name, numberInput) {
        return h('span', [
            name,
            NumberInput.render(numberInput)
        ]);
    }

    return h('div', [
        numberspanny('red', state.red),
        numberspanny('blue', state.blue),
        numberspanny('green', state.green)
    ]);
};

hg.app(document.body, App(), App.render);
