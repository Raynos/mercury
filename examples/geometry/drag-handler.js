var window = require("global/window")
var extend = require("xtend")

module.exports = DragEventHandler

function DragEventHandler(fn, value) {
    if (!(this instanceof DragEventHandler)) {
        return new DragEventHandler(fn, value)
    }

    this.fn = fn
    this.value = value || {}
}

DragEventHandler.prototype.handleEvent = function (ev) {
    var fn = this.fn
    var value = this.value

    var currentX = ev.offsetX || ev.layerX
    var currentY = ev.offsetY || ev.layerY

    function onmove(ev) {
        var delta = {
            x: ev.clientX - currentX,
            y: ev.clientY - currentY
        }

        fn(extend(value, delta))

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
