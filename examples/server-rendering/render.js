var mercury = require('../../index.js');
var h = require('../../index.js').h;

module.exports = render;

function render(state) {
    return h('div', [
        h('span', state.description),
        h('ul', state.items.map(function (item) {
            return h('li', [
                h('span', item.name)
            ])
        })),
        h('input', {
            'data-event': mercury.submitEvent(state.events.add)
        }, {
            name: 'name',
            placeholder: 'name'
        })
    ]);
}
