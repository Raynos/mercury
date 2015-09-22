'use strict';

var hg = require('../../index.js');
var document = require('global/document');

// Copied from examples/count.js
function App() {
    return hg.state({
        count: hg.value(0),
        _hotVersion: hg.value(0), // This is new - see below
        channels: {
            clicks: incrementCount,
        },
    });
}

function incrementCount(state) {
    state.count.set(state.count() + 1);
}

// This render function may be replaced!
var render = require('./render.js');
App.render = function(state) {
    return render(state);
};

// Need a reference to this below.
var appState = App();
hg.app(document.body, appState, App.render);

// Special sauce: detect changes to the rendering code and swap the rendering
// function out without reloading the page.
if (module.hot) {
    module.hot.accept('./render.js', function() {
        render = require('./render.js');
        // Force a re-render by changing the application state.
        appState._hotVersion.set(appState._hotVersion() + 1);
        return true;
    });
}
