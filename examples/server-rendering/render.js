'use strict';

var mercury = require('../../index.js');
var h = require('../../index.js').h;

module.exports = render;

function render(state) {
    return h('div', {
        'ev-event': mercury.submitEvent(state.handles.add)
    }, [
        h('span', state.description),
        h('ul', state.items.map(function toItem(item) {
            return h('li', [
                h('span', item.name)
            ]);
        })),
        h('input', {
            name: 'name',
            placeholder: 'name'
        })
    ]);
}
