var mercury = require('../index.js');
var h = mercury.h;

function CanvasWidget(paint, data) {
    if (!(this instanceof CanvasWidget)) {
        return new CanvasWidget(paint, data);
    }
  
    this.data = data;
    this.paint = paint;
}

CanvasWidget.prototype.type = 'Widget';
 
CanvasWidget.prototype.init = function () {
    var elem = document.createElement('canvas');
    this.update(null, elem);
    return elem;
}
 
CanvasWidget.prototype.update = function (prev, elem) {
    var context = elem.getContext('2d')
  
    this.paint(context, this.data);
}

var color = mercury.value('red');
var change = mercury.input();

change(function (data) {
    color.set(data.color);
});

function renderColor(color) {
    return h('div', [
        h('div', [
            h('span', color + ' '),
            h('input', {
                'ev-event': mercury.changeEvent(change),
                value: color,
                name: 'color'
            })
        ]),
        CanvasWidget(drawColor, color)
    ])
}

function drawColor(context, color) {
    context.fillStyle = color;
    context.fillRect(0, 0, 100, 100);
}

mercury.app(document.body, color, renderColor);
