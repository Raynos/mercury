'use strict';

var hg = require('../../index.js');
var document = require('global/document');
var window = require('global/window');

// Copied from examples/count.js
function App() {
    return hg.state({
        count: hg.value(0),
        _hotVersion: hg.value(0), // This is new - see below
        channels: {
            clicks: incrementCount
        }
    });
}

function incrementCount(state) {
    state.count.set(state.count() + 1);
}

// This render function may be replaced by webpack and browserify!
var render = require('./render.js');
App.render = function renderApp(state) {
    return render(state);
};

// Need a reference to this below.
var appState = App();

hg.app(document.body, appState, App.render);

// Special sauce for webpack and browserify:
// Detect changes to the rendering code and swap the rendering
// function out without reloading the page.
if (module.hot) {
    module.hot.accept('./render.js', function swapModule() {
        render = require('./render.js');
        forceRerender(appState);
        return true;
    });
}

// Otherwise, if using amok, an event is fired when a file changes.
window.addEventListener('patch', function() {
    forceRerender(appState);
});

// Force a re-render by changing the application state.
function forceRerender(appState) {
    appState._hotVersion.set(appState._hotVersion() + 1);
}
