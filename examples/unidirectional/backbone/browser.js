var mercury = require('../../../index.js');
var backbone = require('backbone');
var h = mercury.h;

var toObserv = require('./observ-backbone.js')

var Item = backbone.Model.extend({
    defaults: {
        name: '',
        value: '',
        color: ''
    }
});

var Items = backbone.Collection.extend({
    model: Item
});

var AppState = backbone.Model.extend({
    defaults: {
        description: '',
        events: {},
        items: []
    }
})

var events = mercury.input(['add'])

var state = new AppState({
    description: 'app state description',
    events: events,
    items: new Items([
        { name: 'one', value: 'first', color: 'red' },
        { name: 'two', value: 'second', color: 'blue' }
    ])
})

events.add(function (data) {
    state.get('items').add(data)
})

window.state = state;

mercury.app(document.body, toObserv(state), render)

function render(state) {
    return h('div', [
        h('h2', state.description),
        h('ul', state.items.map(function (item) {
            return h('li', {
                key: item.cid,
                style: { color: item.color }
            }, [
                h('span', item.name),
                h('input', { value: item.value })
            ])
        })),
        h('div', {
            'ev-event': mercury.submitEvent(state.events.add)
        }, [
            h('input', {
                name: 'name',
                placeholder: 'name'
            }),
            h('input', {
                name: 'value',
                placeholder: 'value'
            }),
            h('input', {
                name: 'color',
                placeholder: 'color'
            }),
            h('button', 'add')
        ])
    ])
}
