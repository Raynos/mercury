var mercury = require("../index.js")
var h = mercury.h

var clicks = mercury.input()
var clickCount = mercury.value(0)

clicks(function () {
    clickCount.set(clickCount() + 1)
})

function render(clickCount) {
    return h("div.counter", [
        "The state ", h("code", "clickCount"),
        " has value: " + clickCount + ".", h("input.button", {
            type: "button",
            value: "Click me!",
            "ev-click": mercury.event(clicks)
        })
    ])
}

mercury.app(document.body, clickCount, render)
