var mercury = require("../../index.js")
var extend = require("xtend")

var Game2048 = {
    size: 4
}

module.exports = {
    game: GameState
}

function GameState(events, initialState) {
    var state = extend(Game2048, initialState)

    return mercury.hash({
        events: events,
        size: state.size
    })
}
