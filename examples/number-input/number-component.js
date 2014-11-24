'use strict';

var hg = require('../../index.js');
var h = hg.h;

function NumberInput() {
    return hg.state({
        value: hg.value(0),
        handles: {
            change: change,
            increase: increase,
            decrease: decrease
        }
    });
}

function change(state, data) {
    state.value.set(parseInt(data.number, 10) || 0);
}

function increase(state) {
    state.value.set(state.value() + 1);
}

function decrease(state) {
    state.value.set(state.value() - 1);
}

NumberInput.render = function render(state) {
    return h('div', [
        h('input', {
            type: 'text',
            name: 'number',
            value: String(state.value),
            'ev-event': hg.changeEvent(state.handles.change)
        }),
        h('input', {
            type: 'button',
            value: 'increase',
            'ev-click': hg.event(state.handles.increase)
        }, 'increase'),
        h('input', {
            type: 'button',
            value: 'decrease',
            'ev-click': hg.event(state.handles.decrease)
        }, 'decrease')
    ]);
};

module.exports = NumberInput;
