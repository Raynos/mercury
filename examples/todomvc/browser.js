var mercury = require("../../index.js")
var TimeTravel = require("../../time-travel.js")
var document = require("global/document")
var window = require("global/window")
var rafListen = require("./lib/raf-listen.js")
var localStorage = window.localStorage

var Input = require("./input.js")
var State = require("./state.js")
var Render = require("./render.js")
var Update = require("./update.js")

module.exports = createApp

var state = createApp()
window.undo = TimeTravel(state)
mercury.app(document.body, state, Render)

function createApp() {
    // load from localStorage
    var storedState = localStorage.getItem("todos-mercury")
    var initialState = storedState ? JSON.parse(storedState) : null

    var events = Input()
    var state = window.state = State.todoApp(events, initialState)

    wireUpEvents(state, events)

    rafListen(state, function (value) {
        localStorage.setItem("todos-mercury", JSON.stringify(value))
    })

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
    events.cancelEdit(Update.cancelEdit.bind(null, state))
    events.clearCompleted(Update.clearCompleted.bind(null, state))
    events.setRoute(Update.setRoute.bind(null, state))
}
