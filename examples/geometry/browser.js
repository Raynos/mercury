var mercury = require('../../index.js')
var svg = require('../../index.js').svg

var shapes = require('./shapes.js')
var dragEvent = require('./drag-handler.js')

var events = mercury.input(['movePoint'])
var state = mercury.struct({
    p1: mercury.value([100, 100]),
    p2: mercury.value([200, 200]),
    p3: mercury.value([100, 200]),
    c: mercury.value([250, 250]),
    p: mercury.value([250, 300]),
    width: mercury.value(800),
    height: mercury.value(600),
    events: events
})

events.movePoint(function (data) {
    var point = state[data.name]()

    state[data.name].set([
        point[0] + data.x,
        point[1] + data.y
    ])
})

function rootScene(state) {
    return svg('g', [
        shapes.triangle(state.p1, state.p2, state.p3),
        shapes.circle(state.p, state.c),
        shapes.segment(state.p, state.c),
        shapes.point({
            cx: state.c[0],
            cy: state.c[1],
            'ev-mousedown': dragEvent(state.events.movePoint, {
                name: 'c'
            })
        }),
        shapes.point({
            cx: state.p[0],
            cy: state.p[1],
            'ev-mousedown': dragEvent(state.events.movePoint, {
                name: 'p'
            })
        }),
        shapes.point({
            cx: state.p1[0],
            cy: state.p1[1],
            'ev-mousedown': dragEvent(state.events.movePoint, {
                name: 'p1'
            })
        }),
        shapes.point({
            cx: state.p2[0],
            cy: state.p2[1],
            'ev-mousedown': dragEvent(state.events.movePoint, {
                name: 'p2'
            })
        }),
        shapes.point({
            cx: state.p3[0],
            cy: state.p3[1],
            'ev-mousedown': dragEvent(state.events.movePoint, {
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
