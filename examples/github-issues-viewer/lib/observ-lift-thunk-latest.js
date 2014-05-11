var value = require("observ")

module.exports = liftThunkLatest

function liftThunkLatest(source, lambda) {
    var observ = value(null)
    var counter = 0
    var latest = 0

    handleValue(source())
    source(handleValue)

    return observ

    function handleValue(value) {
        var myCounter = ++counter
        latest = myCounter

        var thunk = lambda(value)
        if (thunk) {
            thunk(onvalue)
        }

        function onvalue(newValue) {
            if (latest === myCounter) {
                observ.set(newValue)
            }
        }
    }
}
