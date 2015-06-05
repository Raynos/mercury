'use strict';

var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;
var setTimeout = require('timers').setTimeout;

function Hook() {}
// Hook to be called when DOM node has been rendered
Hook.prototype.hook = function hook(node) {
    node.innerText = 'This is set directly on the real DOM node.';
};
// Hook to be called when DOM node is removed
Hook.prototype.unhook = function unhook(node) {
    node.innerText = 'Unhook hook called';
};

function App() {
    var state = hg.state({
        remove: hg.value(false)
    });
    setTimeout(function timer() {
        state.remove.set(true);
    }, 2000);
    return state;
}

App.render = function App(state) {
    return !state.remove ?
        // Create virtual node with hook
        h('div', {
            hook: new Hook()
        }) :
        // Node without hook
        h('div');
};

hg.app(document.body, App(), App.render);
