var window = require("global/window")
var HashRouter = require("hash-router")
var Event = require("geval")

var mercury = require("../../index.js")

module.exports = createInput

function createInput() {
    var events = mercury.input([
        "toggleAll", "add", "setTodoField", "toggle", "destroy",
        "startEdit", "finishEdit", "cancelEdit", "clearCompleted"
    ])

    events.setRoute = EventRouter()

    return events
}

function EventRouter() {
    var router = HashRouter()
    window.addEventListener("hashchange", router)

    return Event(function (emit) {
        router.on("hash", emit)
    })
}
