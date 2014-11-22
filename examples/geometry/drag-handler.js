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

    var current = {
        x: ev.offsetX || ev.layerX,
        y: ev.offsetY || ev.layerY
    }

    function onmove(ev) {

        var previous = current

        current = {
            x: ev.offsetX || ev.layerX,
            y: ev.offsetY || ev.layerY
        }

        var delta = {
            x: current.x - previous.x,
            y: current.y - previous.y
        }

        fn(extend(value, delta))
    }

    function onup(ev) {
        delegator.unlistenTo("mousemove")
        delegator.removeGlobalEventListener("mousemove", onmove)
        delegator.removeGlobalEventListener("mouseup", onup)
    }

    delegator.listenTo("mousemove")
    delegator.addGlobalEventListener("mousemove", onmove)
    delegator.addGlobalEventListener("mouseup", onup)
}
