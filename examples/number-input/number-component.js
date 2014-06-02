var mercury = require('../../index.js');
var h = mercury.h;

numberInput.Render = function (state) {
    return h('div', [
        h('input', {
            type: 'text',
            name: 'number',
            value: String(state.value),
            'ev-event': mercury.changeEvent(state.events.change)
        }),
        h('input', {
            type: 'button',
            value: 'increase',
            'ev-click': mercury.event(state.events.increase)
        }, 'increase'),
        h('input', {
            type: 'button',
            value: 'decrease',
            'ev-click': mercury.event(state.events.decrease)
        }, 'decrease')
    ]);
};

function numberInput() {
    var state = mercury.hash({
        value: mercury.value(0),
        events: mercury.input(['change', 'increase', 'decrease'])
    });

    state.events.change(function (data) {
        state.value.set(parseInt(data.number, 10) || 0);
    });

    state.events.increase(function () {
        state.value.set(state.value() + 1);
    });

    state.events.decrease(function () {
        state.value.set(state.value() - 1);
    });

    return { state: state };
}

module.exports = numberInput
