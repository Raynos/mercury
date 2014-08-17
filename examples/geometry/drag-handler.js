var mercury = require('../../index.js')
var extend = require("xtend")

module.exports = DragEventHandler

function DragEventHandler(fn, value) {
    if (!(this instanceof DragEventHandler)) {
        return new DragEventHandler(fn, value)
    }

    this.fn = fn
    this.value = value || {}
    this.delegator = mercury.Delegator()
}

DragEventHandler.prototype.handleEvent = function (ev) {
    var fn = this.fn
    var value = this.value
    var delegator = this.delegator

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
        delegator.removeGlobalEventListener("mousemove", onmove)
        delegator.removeGlobalEventListener("mouseup", onup)
    }

    delegator.addGlobalEventListener("mousemove", onmove)
    delegator.addGlobalEventListener("mouseup", onup)
}
