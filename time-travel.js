module.exports = TimeTravel;

function TimeTravel(state) {
    var history = [state()]

    // Tracks the current position in history.
    var cursor = 0

    var isRedoOrUndo = false

    state(function recordState(newState) {

        // This function gets called whenever there is a state change.
        // State changes happen due to events being handled, or due to
        // undo/redo.

        // If we are replaying items in the history,
        // we don't want to re-add them to the end of the history.
        // Just quit.
        if(isRedoOrUndo) {
            return
        }

        // If we've made it this far, `newState` is due to a new action,
        // not due to undo/redo.

        // If we've called `undo` a bunch of times,
        // the cursor won't be at the end.
        // Any states past the cursor should be cut off.
        history.splice(cursor + 1)

        // Add the new item to the history
        history.push(newState)

        cursor = history.length - 1
    })

    return { undo: undo, redo: redo }

    function undo() {
        if (cursor < 1) {
            // Don't move before the beginning of time
            return
        }
        cursor--
        isRedoOrUndo = true
        state.set(history[cursor])
        isRedoOrUndo = false
        return history[cursor]
    }

    function redo() {
        if(cursor + 1 >= history.length) {
            // Don't move past the end of time
            return
        }
        cursor++
        isRedoOrUndo = true
        state.set(history[cursor])
        isRedoOrUndo = false
        return history[cursor]
    }
}
