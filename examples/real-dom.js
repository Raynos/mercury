'use strict';

var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;
var setTimeout = require('timers').setTimeout;

function Hook() {}
// Hook to be called when DOM node has been rendered
Hook.prototype.hook = function hook(node) {
    node.innerHTML = 'Set directly on real DOM node, by <em>hook</em>.';
};
// Hook to be called when DOM node is removed
Hook.prototype.unhook = function unhook(node) {
    node.innerHTML = 'Set directly on real DOM node, by <em>unhook</em>.';
};

function Widget() {
    this.type = 'Widget';
}

Widget.prototype.init = function init() {
    var elem = document.createElement('div');
    elem.innerHTML = 'Set directly on real DOM node, by widget ' +
        '<em>before</em> update.';
    return elem;
};
Widget.prototype.update = function update(prev, elem) {
    elem.innerHTML = 'Set directly on real DOM node, by widget ' +
        '<em>after</em> update.';
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
    return h('div', [
        !state.remove ?
            // Create virtual node with hook
            h('div', {
                hook: new Hook()
            }) :
            // Node without hook
            h('div'),
        new Widget()
    ]);
};

hg.app(document.body, App(), App.render);
