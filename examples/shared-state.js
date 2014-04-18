var mercury = require("../index.js")
var h = mercury.h

var events = mercury.input(["change"])
var textValue = mercury.value("")

events.change(function (data) {
    textValue.set(data.text)
})

function inputBox(value, sink) {
    return h("input.input", {
        value: value,
        name: "text",
        "data-event": mercury.changeEvent(sink)
    })
}

function render(textValue) {
    return h("div", [
        h("p.content", "The value is now: " + textValue),
        h("p", [
            "Change it here: ",
            inputBox(textValue, events.change)
        ])
    ])
}

mercury.app(document.body, textValue, render)
