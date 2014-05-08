function slideRow(row, direction) {
    return pad(compact(row.filter(Boolean), direction), row.length, null)
}

function compact(list, slideLeft) {
    var result = []

    for (var i = 0; i < list.length; i++) {
        var left = list[i]
        var right = list[i + 1]
        if ((left && left.num) !== (right && right.num)) {
            result.push(left)
        } else {
            result.push({
                id: right.id,
                num: 2 * left.num
            })
            i++
        }
    }
    return result
}

function pad(list, length, padding) {
    for (var i = list.length; i < length; i++) {
        list[i] = padding
    }
    return list
}

function applyShift(grid, rowSize, rowStart, rowSkip, cellSkip) {
    var row = []
    var result = []

    for (var i = 0; i < rowSize; i++) {
        for (var j = 0; j < rowSize; j++) {
            row[j] = grid[gridIndex(rowStart, rowSkip, cellSkip, i, j)]
        }
        row = slideRow(row)
        for (var k = 0; k < rowSize; k++) {
            result[gridIndex(rowStart, rowSkip, cellSkip, i, k)] = row[k]
        }
    }

    console.log(result)
    return result
}

function shift(grid, direction) {
    var rowSize = 4
    var colSize = 4

    if (direction === 'up') {
        return applyShift(grid, colSize, 0, 1, rowSize)
    } else if (direction === 'down') {
        return applyShift(grid, colSize, rowSize * (colSize - 1), 1, -rowSize)
    } else if (direction === 'left') {
        return applyShift(grid, rowSize, 0, rowSize, 1)
    } else if (direction === 'right') {
        return applyShift(grid, rowSize, rowSize - 1, rowSize, -1)
    } else {
        return grid
    }
}

function gridIndex(rowStart, rowSkip, cellSkip, rowIndex, cellIndex) {
    return rowStart + (rowIndex * rowSkip) + (cellSkip * cellIndex)
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

module.exports = {
    clear: clear,
    getAvailableCells: getAvailableCells,
    shift: shift
}
