var mercury = require("../index.js")
var h = mercury.h

var delegator = mercury.Delegator()
var inputs = mercury.EventSinks(delegator.id, ["change"])
var textValue = mercury.value("")

inputs.events.change(function (data) {
    textValue.set(data.currentValue.text)
})

function inputBox(value, sink) {
    return h("input", {
        value: value,
        name: "text",
        "data-event": mercury.changeEvent(sink)
    })
}

function render(textValue) {
    return h("div", [
        h("p", "The value is now: " + textValue),
        h("p", [
            "Change it here: ",
            inputBox(textValue, inputs.sinks.change)
        ])
    ])
}

var loop = mercury.main(textValue(), render)
textValue(loop.update)
document.body.appendChild(loop.target)
