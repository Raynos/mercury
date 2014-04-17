var mercury = require("../../index.js")
var window = require("global/window")

var Input = require("./input.js")
var Render = require("./render.js")
var State = require("./state.js")
// var Update = require("./update.js")

module.exports = createApp

var state = window.state = createApp()
mercury.app(document.body, state, Render)

state.grid.splice(0, 1, State.tile({ number: 2, x: 1, y: 1 }))
state.grid.splice(1, 1, State.tile({ number: 2, x: 1, y: 2 }))

function createApp() {
    var initialState = null

    var events = Input()
    var state = State.game(events, initialState)

    wireUpEvents(state, events)

    return state
}

function wireUpEvents(state, events) {
    // events.foo(Update.foo.bind(null, state))
}
