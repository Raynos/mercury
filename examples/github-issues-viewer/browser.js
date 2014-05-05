var mercury = require("../../index.js")

var Input = require("./input.js")
var State = require("./state.js")
var Render = require("./render.js")
var Update = require("./update.js")

var state = window.state = createApp()
mercury.app(document.body, state, Render)

function createApp() {
    var state = State.githubIssues(null)
    var events = Input(state)

    state.events.set(events)

    autoWire(state, events, Update)

    return state
}

function autoWire(state, events, Update) {
    Object.keys(events).forEach(function (eventName) {
        var func = Update[eventName]

        if (!func) {
            return
        }

        events[eventName](Update[eventName].bind(null, state))
    })
}
