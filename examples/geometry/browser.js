var mercury = require('../../mercury.js')
var h = require('../../mercury.js').h
var s = require('../../mercury.js').s

var shapes = require('./shapes.js')

var inputs = mercury.input(['movePoint'])
var state = mercury.hash({
    p1: mercury.value([100, 200]),
    p2: mercury.value([200, 200]),
    p3: mercury.value([100, 200]),
    c: mercury.valu([250, 250]),
    p: mercury.value([250, 300]),
    width: mercury.value(800),
    height: mercury.value(600),
    sinks: inputs.sinks
})

inputs.sources.movePoint(function (ev) {
    var point = state[ev.name]()

    state[ev.name].set([
        point.x + ev.x,
        point.y + ev.y
    ])
})

// wire up inputs
function rootScene(state) {
    return s('g', [
        shapes.triangle(state.p1, state.p2, state.p3),
        shapes.circle(state.p, state.c),
        shapes.segment(state.p, state.c),
        shapes.point(state.c, state.sinks.movePoint, {
            name: 'c'
        }),
        shapes.point(state.p, state.sinks.movePoint, {
            name: 'p'
        }),
        shapes.point(state.p1, state.sinks.movePoint, {
            name: 'p1'
        }),
        shapes.point(state.p2, state.sinks.movePoint, {
            name: 'p2'
        }),
        shapes.point(state.p3, state.sinks.movePoint, {
            name: 'p3'
        })
    ])
}

function render(state) {
    return h('svg', {
        'width': state.width,
        'height': state.height,
        'style': { 'border': '1px solid black' }
    }, [
        s('text', {
            style: {
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none'
            },
            x: 20,
            y: 20,
            'font-size': 20
        }, 'The points are draggable'),
        rootScene(state)
    ])
}

mercury.app(document.body, state, render)
