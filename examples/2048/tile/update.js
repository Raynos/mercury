module.exports = {
    indexToPosition: indexToPosition
}

function indexToPosition(size, index) {
    var x = index % size
    var y = (index - x) / size

    return [x, y]
}
