var window = require("global/window")
var HashRouter = require("hash-router")
var Event = require("geval")

var mercury = require("../../index.js")

module.exports = createInput

function createInput() {
    var del = mercury.Delegator()
    var tuple = mercury.EventSinks(del.id, [
        "toggleAll", "add", "setTodoField", "toggle", "destroy",
        "startEdit", "finishEdit"
    ])

    tuple.events.setRoute = EventRouter()

    return { sinks: tuple.sinks, events: tuple.events }
}

function EventRouter() {
    var router = HashRouter()
    window.addEventListener("hashchange", router)

    return Event(function (emit) {
        router.on("hash", emit)
    })
}
