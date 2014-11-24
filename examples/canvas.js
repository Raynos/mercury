'use strict';

var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;

function CanvasWidget(paint, data) {
    if (!(this instanceof CanvasWidget)) {
        return new CanvasWidget(paint, data);
    }

    this.data = data;
    this.paint = paint;
}

CanvasWidget.prototype.type = 'Widget';

CanvasWidget.prototype.init = function init() {
    var elem = document.createElement('canvas');
    this.update(null, elem);
    return elem;
};

CanvasWidget.prototype.update = function update(prev, elem) {
    var context = elem.getContext('2d');

    this.paint(context, this.data);
};

function App() {
    return hg.state({
        color: hg.value('red'),
        handles: {
            changeColor: changeColor
        }
    });
}

function changeColor(state, data) {
    state.color.set(data.color);
}

App.render = function renderColor(state) {
    var handles = state.handles;

    return h('div', [
        h('div', [
            h('span', state.color + ' '),
            h('input', {
                'ev-event': hg.changeEvent(handles.changeColor),
                value: state.color,
                name: 'color'
            })
        ]),
        CanvasWidget(drawColor, state.color)
    ]);
};

function drawColor(context, color) {
    context.fillStyle = color;
    context.fillRect(0, 0, 100, 100);
}

hg.app(document.body, App(), App.render);
