var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;

function App() {
    var state = hg.struct({
        text: hg.value(''),
        handles: hg.value(null)
    });

    state.handles.set(hg.handles({
        change: setText
    }, state));

    return state;
}

function inputBox(value, sink) {
    return h('input.input', {
        value: value,
        name: 'text',
        type: 'text',
        'ev-event': hg.changeEvent(sink)
    });
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

function setText(state, data) {
    state.text.set(data.text);
}

hg.app(document.body, App(), App.render);
