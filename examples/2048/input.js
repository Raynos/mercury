var mercury = require("../../index.js")

module.exports = createInput

function createInput() {
    var events = mercury.input(["resetGame"])

    return events
}
