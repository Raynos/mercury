module.exports = TimeTravel

function TimeTravel(state) {
    var states = [state()]

    state(function (newState) {
        if (newState !== states[0]) {
            states.unshift(newState)
        }
    })

    return undo

    function undo() {
        states.shift()
        state.set(states[0])
        return states[0]
    }
}
