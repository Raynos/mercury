var mercury = require("../../index.js")
var document = require("global/document")

var Input = require("./input.js")
var State = require("./state.js")
var Render = require("./render.js")
var Update = require("./update.js")

module.exports = createApp

mercury.app(document.body, createApp(), Render)

function createApp() {
    // load from localStorage
    var initialState = null

    var events = Input()
    var state = State.todoApp(events, initialState)

    wireUpEvents(state, events)

    return state
}

function wireUpEvents(state, events) {
    events.toggleAll(Update.toggleAll.bind(null, state))
    events.add(Update.add.bind(null, state))
    events.setTodoField(Update.setTodoField.bind(null, state))
    events.toggle(Update.toggle.bind(null, state))
    events.destroy(Update.destroy.bind(null, state))
    events.startEdit(Update.startEdit.bind(null, state))
    events.finishEdit(Update.finishEdit.bind(null, state))
    events.setRoute(Update.setRoute.bind(null, state))
}
