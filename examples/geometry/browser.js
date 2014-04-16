var mercury = require('../../mercury.js')
var h = require('../../mercury.js').h
var svg = require('../../mercury.js').svg

var shapes = require('./shapes.js')
var dragEvent = require('./drag-handler.js')

var inputs = mercury.input(['movePoint'])
var state = mercury.hash({
    p1: mercury.value([100, 200]),
    p2: mercury.value([200, 200]),
    p3: mercury.value([100, 200]),
    c: mercury.value([250, 250]),
    p: mercury.value([250, 300]),
    width: mercury.value(800),
    height: mercury.value(600),
    sinks: inputs.sinks
})

inputs.movePoint(function (data) {
    var point = state[data.name]()

    state[data.name].set([
        point.x + data.x,
        point.y + data.y
    ])
})

// wire up inputs
function rootScene(state) {
    return svg('g', [
        shapes.triangle(state.p1, state.p2, state.p3),
        shapes.circle(state.p, state.c),
        shapes.segment(state.p, state.c),
        shapes.point({
            cx: state.c[0],
            cy: state.c[1],
            'data-mousedown': dragEvent(state.movePoint, {
                name: 'c'
            })
        }),
        shapes.point({
            cx: state.p[0],
            cy: state.p[1],
            'data-mousedown': dragEvent(state.movePoint, {
                name: 'p'
            })
        }),
        shapes.point({
            cx: state.p1[0],
            cy: state.p1[1],
            'data-mousedown': dragEvent(state.movePoint, {
                name: 'p1'
            })
        }),
        shapes.point({
            cx: state.p2[0],
            cy: state.p2[1],
            'data-mousedown': dragEvent(state.movePoint, {
                name: 'p2'
            })
        }),
        shapes.point({
            cx: state.p3[0],
            cy: state.p3[1],
            'data-mousedown': dragEvent(state.movePoint, {
                name: 'p3'
            })
        })
    ])
}

function render(state) {
    return svg('svg', {
        'width': state.width,
        'height': state.height,
        'style': { 'border': '1px solid black' }
    }, [
        svg('text', {
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
