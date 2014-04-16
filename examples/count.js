var mercury = require("../index.js")
var h = mercury.h

var events = mercury.input(["clicks"])
var clickCount = mercury.value(0)

events.clicks(function () {
    clickCount.set(clickCount() + 1)
})

function render(clickCount) {
    return h("div", [
        "The state ",
        h("code", "clickCount"),
        " has value: " + clickCount + ".",
        h("input", {
            type: "button",
            value: "Click me!",
            "data-click": mercury.event(events.clicks)
        })
    ])
}

mercury.app(document.body, clickCount, render)
