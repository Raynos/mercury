var mercury = require("../../../index.js")
var cuid = require("cuid")

var Render = require("./render.jsx")

var events = mercury.input(["add", "changeText", "toggle"])

var state = mercury.hash({
    description: mercury.value(""),
    list: mercury.array([]),
    events: events
})

events.add(function (description) {
    state.list.push(mercury.hash({
        id: cuid(),
        description: mercury.value(description),
        done: mercury.value(false)
    }))
})

events.changeText(function (data) {
    state.description.set(data.description)
})

events.toggle(function (data) {
    state.list.some(function (item) {
        if (item.id === data.id) {
            item.done.set(!item.done())
            return true
        }
    })
})

mercury.app(document.body, state, Render)
