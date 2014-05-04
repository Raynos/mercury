module.exports = {
    clear: clear,
    getAvailableCells: getAvailableCells
}

function clear(grid, size) {
    var len = size() * size()
    var currGrid = grid().slice()
    for (var i = 0; i < len; i++) {
        currGrid[i] = null
    }

    grid.set(currGrid)
}

function getAvailableCells(grid) {
    var currGrid = grid()

    return currGrid.reduce(function (acc, value, index) {
        if (value === null) {
            acc.push(index)
        }
        return acc
    }, [])
}
