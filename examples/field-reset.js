var mercury = require("../index.js")
var h = mercury.h

var events = mercury.input(["reset"])

var state = mercury.hash({
    isReset: mercury.value(false),
    events: events
})

events.reset(function (bool) {
    state.isReset.set(bool)
})

function render(state) {
    return h("div", [
        "Text field: ",
        h("input.input", {
            value: state.isReset ?
                resetHook("", state.events.reset) :
                undefined
        }),
        h("input.button", {
            type: "button",
            value: "Reset text field",
            "ev-click": mercury.event(state.events.reset, true)
        })
    ])
}

mercury.app(document.body, state, render)

function resetHook(value, sink) {
    if (!(this instanceof resetHook)) {
        return new resetHook(value, sink)
    }

    this.value = value
    this.sink = sink
}

resetHook.prototype.hook = function (elem, propName) {
    elem[propName] = this.value
    this.sink(false)
}
