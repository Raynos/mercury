var window = require("global/window")
var extend = require("xtend")

module.exports = DragEventHandler

function DragEventHandler(sink, value) {
    if (!(this instanceof DragEventHandler)) {
        return new DragEventHandler(sink)
    }

    this.id = sink.id
    this.sink = sink
    this.value = value || {}
}

DragEventHandler.prototype.handleEvent = function (ev) {
    var sink = this.sink
    var value = this.value

    var currentX = ev.offsetX
    var currentY = ev.offsetY

    function onmove(ev) {
        var delta = {
            x: ev.clientX - currentX,
            y: ev.clientY - currentY
        }

        sink.write(extend(value, delta))

        currentX = ev.clientX
        currentY = ev.clientY
    }

    function onup(ev) {
        window.removeEventListener("mousemove", onmove)
        window.removeEventListener("mouseup", onup)
    }

    window.addEventListener("mousemove", onmove)
    window.addEventListener("mouseup", onup)
}
