'use strict';

var document = require('global/document');
var hg = require('../../index.js');
var svg = require('virtual-dom/virtual-hyperscript/svg');

var shapes = require('./shapes.js');
var dragEvent = require('./lib/drag-handler.js');

function App() {
    return hg.state({
        p1: hg.value([100, 100]),
        p2: hg.value([200, 200]),
        p3: hg.value([100, 200]),
        c: hg.value([250, 250]),
        p: hg.value([250, 300]),
        width: hg.value(800),
        height: hg.value(600),
        channels: {
            movePoint: movePoint
        }
    });
}

function movePoint(state, data) {
    var point = state[data.name]();

    state[data.name].set([
        point[0] + data.x,
        point[1] + data.y
    ]);
}

App.render = function render(state) {
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
    ]);
};

function rootScene(state) {
    return svg('g', [
        shapes.triangle(state.p1, state.p2, state.p3),
        shapes.circle(state.p, state.c),
        shapes.segment(state.p, state.c),
        shapes.point({
            cx: state.c[0],
            cy: state.c[1],
            'ev-mousedown': dragEvent(state.channels.movePoint, {
                name: 'c'
            })
        }),
        shapes.point({
            cx: state.p[0],
            cy: state.p[1],
            'ev-mousedown': dragEvent(state.channels.movePoint, {
                name: 'p'
            })
        }),
        shapes.point({
            cx: state.p1[0],
            cy: state.p1[1],
            'ev-mousedown': dragEvent(state.channels.movePoint, {
                name: 'p1'
            })
        }),
        shapes.point({
            cx: state.p2[0],
            cy: state.p2[1],
            'ev-mousedown': dragEvent(state.channels.movePoint, {
                name: 'p2'
            })
        }),
        shapes.point({
            cx: state.p3[0],
            cy: state.p3[1],
            'ev-mousedown': dragEvent(state.channels.movePoint, {
                name: 'p3'
            })
        })
    ]);
}

hg.app(document.body, App(), App.render);
