module.exports = TimeTravel;

function TimeTravel(state) {
    var states = [state()];
    var IN_TRANSACTION = false;

    state(function onState(newState) {
        if (!IN_TRANSACTION) {
            states.unshift(newState);
        }
    });

    return undo;

    function undo() {
        if (states.length <= 1) {
            return;
        }

        states.shift();
        IN_TRANSACTION = true;
        state.set(states[0]);
        IN_TRANSACTION = false;
        return states[0];
    }
}
