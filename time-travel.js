module.exports = TimeTravel

function TimeTravel(state) {

    var states = [state()]
    var cursor = 0
    var transitioning = false

    state(function (newState) {
        if(transitioning) {
            return
        }
        states.splice(cursor + 1)
        states.push(newState)
        cursor = states.length - 1
    })

    return { undo: undo, redo: redo }

    function undo() {
        if (cursor < 1) {
            return
        }
        cursor--
        transitioning = true
        state.set(states[cursor])
        transitioning = false
        return states[cursor]
    }

    function redo() {
        if(cursor + 1 >= states.length) {
            return
        }
        cursor++
        transitioning = true
        state.set(states[cursor])
        transitioning = false
        return states[cursor]
    }
}
