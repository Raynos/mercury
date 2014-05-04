var Keyboard = require("frp-keyboard")
var merge = require("./lib/observ-merge.js")

var mercury = require("../../index.js")

module.exports = createInput

function createInput() {
    var keyboard = Keyboard()
    var events = mercury.input(["resetGame"])

    events.move = merge([keyboard.wasd, keyboard.arrows])

    return events
}
