module.exports = {
    clear: clear,
    getAvailableCells: getAvailableCells,
    shift: shift
}

function shift(grid, direction) {

    return grid
}

function clear(grid, size) {
    var len = size * size
    var currGrid = grid.slice()
    for (var i = 0; i < len; i++) {
        currGrid[i] = null
    }

    return currGrid
}

function getAvailableCells(grid) {
    return grid.reduce(function (acc, value, index) {
        if (value === null) {
            acc.push(index)
        }
        return acc
    }, [])
}

function toMatrix(grid) {

}

function fromMatrix(matrix) {

}
