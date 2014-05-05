var value = require("observ")

module.exports = liftThunk

function liftThunk(source, lambda) {
    var observ = value(null)

    lambda(source())(observ.set)
    source(onvalue)

    return observ

    function onvalue(value) {
        lambda(value)(observ.set)
    }
}
