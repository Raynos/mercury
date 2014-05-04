var State = require("./state.js")

var Grid = require("./grid/update.js")
var Tile = require("./tile/update.js")

module.exports = {
    resetGame: resetGame,
    move: move,
    updateScore: updateScore,
    movesAvailable: movesAvailable,
}

function rand(n) {
    return Math.floor(Math.random() * n)
}

function resetGame(state) {
    state.currentScore.set(0)

    Grid.clear(state.grid, state.size)

    // insert N random tiles for initial position
    var availableCells = Grid.getAvailableCells(state.grid)
    var startingTiles = state.startingTiles()
    var len = availableCells.length < startingTiles ?
        availableCells.length : startingTiles

    for (var i = 0; i < len; i++) {
        var choosen = rand(availableCells.length)
        var index = availableCells.splice(choosen, 1)[0]
        var pos = Tile.indexToPosition(state.size, index)

        state.grid.put(index, State.tile({
            x: pos[0],
            y: pos[1]
        }))
    }
}

function move(state, coords) {
    var x = coords.x, y = coords.y
}

function updateScore(state) {

}

function movesAvailable(state) {
    return Grid.getAvailableCells(state.grid).length !== 0 ||
        tileMatchesAvailable(state)
}

function tileMatchesAvailable(state) {

}
