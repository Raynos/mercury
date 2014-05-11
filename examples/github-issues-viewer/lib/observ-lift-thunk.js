var value = require("observ")

module.exports = liftThunk

function liftThunk(source, lambda) {
    var observ = value(null)

    handleValue(source())
    source(handleValue)

    return observ

    function handleValue(value) {
        var thunk = lambda(value)
        if (thunk) {
            thunk(observ.set)
        }
    }
}
