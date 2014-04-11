var mercury = require("../index.js")
var h = mercury.h

var delegator = mercury.Delegator()
var input = mercury.EventSinks(delegator.id, ["reset"])

var state = mercury.hash({
    isReset: mercury.value(false),
    sinks: input.sinks
})

input.events.reset(function (bool) {
    state.isReset.set(bool)
})

function render(state) {
    return h("div", [
        "TEMPORARILY KAPUT.",
        "Text field: ",
        h("input", {
            value: state.isReset ?
                resetHook("", state.sinks.reset) :
                undefined
        }),
        h("input", {
            type: "button",
            value: "Reset text field",
            "data-click": mercury.event(state.sinks.reset, true)
        })
    ])
}

var loop = mercury.main(state(), render)
state(loop.update)
require("global/document").body.appendChild(loop.target)

function resetHook(value, sink) {
    if (!(this instanceof resetHook)) {
        return new resetHook(value, sink)
    }

    this.value = value
    this.sink = sink
}

resetHook.prototype.hook = function (elem, propName) {
    elem[propName] = this.value
    this.sink.write(false)
}
