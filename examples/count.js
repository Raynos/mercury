var mercury = require("../index.js")
var h = mercury.h

var delegator = mercury.Delegator()
var inputs = mercury.EventSinks(delegator.id, ["clicks"])
var clickCount = mercury.value(0)

inputs.events.clicks(function () {
    clickCount.set(clickCount() + 1)
})

function render(clickCount) {
    var tree = h("div", [
        "The state ",
        h("code", "clickCount"),
        " has value: " + clickCount + ".",
        h("input", {
            type: "button",
            value: "Click me!",
            "data-click": mercury.event(inputs.sinks.clicks)
        })
    ])
    console.log("tree", tree)
    return tree
}

var loop = mercury.main(clickCount(), render)
clickCount(loop.update)
document.body.appendChild(loop.target)
