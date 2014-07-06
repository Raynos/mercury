var document = require('global/document');
var mercury = require('../index.js');
var h = mercury.h;

var events = mercury.input(['reset']);

var app = mercury.struct({
    isReset: mercury.value(false),
    events: events
});

events.reset(function reset(bool) {
    app.isReset.set(bool);
});

function render(state) {
    return h('div', [
        'Text field: ',
        h('input.input', {
            value: state.isReset ?
                resetHook('', state.events.reset) :
                undefined
        }),
        h('input.button', {
            type: 'button',
            value: 'Reset text field',
            'ev-click': mercury.event(state.events.reset, true)
        })
    ]);
}

mercury.app(document.body, app, render);

function resetHook(value, sink) {
    if (!(this instanceof resetHook)) {
        return new resetHook(value, sink);
    }

    this.value = value;
    this.sink = sink;
}

resetHook.prototype.hook = function hook(elem, propName) {
    elem[propName] = this.value;
    this.sink(false);
};
