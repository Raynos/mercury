var mercury = require("../../index.js")

var Render = require("./render.js")

module.exports = createApp

var state = window.state = createApp()
mercury.app(document.body, state, Render)

function createApp() {
    var initialState = null

    var events = null
    var state = mercury.hash({})

    return state
}
