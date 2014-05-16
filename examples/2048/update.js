var State = require("./state.js")

module.exports = {
    resetGame: resetGame,
    move: move,
    updateScore: updateScore,
    movesAvailable: movesAvailable,
}

function rand(n) {
    return Math.floor(Math.random() * n)
}

function clearGrid(state) {
    var len = state.size() * state.size()
    var grid = state.grid().slice()
    for (var i = 0; i < len; i++) {
        grid[i] = null
    }

    state.grid.set(grid)
}

function getAvailableCells(state) {
    var grid = state.grid()

    return grid.reduce(function (acc, value, index) {
        if (value === null) {
            acc.push(index)
        }
        return acc
    }, [])
}

function indexToPosition(state, index) {
    var size = state.size()
    var x = index % size
    var y = (index - x) / size

    return [x, y]
}

function resetGame(state) {
    clearGrid(state)

    // insert N random tiles for initial position
    var availableCells = getAvailableCells(state)
    var startingTiles = state.startingTiles()
    var len = availableCells.length < startingTiles ?
        getAvailableCells.length : startingTiles

    for (var i = 0; i < len; i++) {
        var choosen = rand(availableCells.length)
        var index = availableCells.splice(choosen, 1)[0]
        var pos = indexToPosition(state, index)

        state.grid.put(index, State.tile({
            x: pos[0],
            y: pos[1]
        }))
    }
}

function move(state, data) {

}

function updateScore(state) {

}

function movesAvailable(state) {
    return getAvailableCells(state).length !== 0 ||
        tileMatchesAvailable(state)
}

function tileMatchesAvailable(state) {

}
