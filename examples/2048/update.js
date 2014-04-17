module.exports = {
    resetGame: resetGame,
    move: move,
    updateScore: updateScore,
    movesAvailable: movesAvailable
}

function resetGame(state) {

}

function move(state, data) {

}

function updateScore(state) {

}

function movesAvailable(state) {
    return cellsAvailable(state) || tileMatchesAvailable(state)
}

function cellsAvailable(state) {

}

function tileMatchesAvailable(state) {

}
