var document = require('min-document');

var mercury = require('../../index.js');

module.exports = embedComponent;

function embedComponent(component) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    var startState = component.state();

    var remove = mercury.app(div, component.state, component.render);

    return {
        destroy: destroy,
        state: component.state,
        render: component.render,
        target: div
    };

    function destroy() {
        component.state.set(startState);
        document.body.removeChild(div);
        remove();
    }
}
