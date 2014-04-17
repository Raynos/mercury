var mercury = require("../../index.js")

var Game2048 = {

}

module.exports = {
    game: GameState
}

function GameState(events, initialState) {
    var state = extend(Game2048, initialState)

    return mercury.hash({
        events: events
    })
}
