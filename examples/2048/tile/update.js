module.exports = {
    indexToPosition: indexToPosition
}

function indexToPosition(size, index) {
    var currSize = size()
    var x = index % currSize
    var y = (index - x) / currSize

    return [x, y]
}
