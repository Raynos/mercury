'use strict';

var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;
var setTimeout = require('timers').setTimeout;

function Hook() {}
// Hook to be called when DOM node has been rendered
Hook.prototype.hook = function hook(node) {
    // Note that you should only modify DOM node attributes in virtual-dom
    // hooks, anything else is unsafe
    node.style.color = 'red';
};
// Hook to be called when DOM node is removed
Hook.prototype.unhook = function unhook(node) {
    node.style.color = null;
};

function Widget() {
    this.type = 'Widget';
}

Widget.prototype.init = function init() {
    var elem = document.createElement('div');
    elem.innerHTML = 'Content set directly on real DOM node, by widget ' +
        '<em>before</em> update.';
    return elem;
};
Widget.prototype.update = function update(prev, elem) {
    elem.innerHTML = 'Content set directly on real DOM node, by widget ' +
        '<em>after</em> update.';
};

function App() {
    var state = hg.state({
        updated: hg.value(false)
    });
    setTimeout(function timer() {
        state.updated.set(true);
    }, 2000);
    return state;
}

App.render = function App(state) {
    return h('div', [
        // Create virtual node with hook if !state.updated
        h('div', !state.updated ? {hook: new Hook()} : {}, [
            'Style attribute of real DOM node set by ',
            h('em', 'hook'),
            ' and unset by ',
            h('em', 'unhook')
        ]),
        // Create widget controlled node
        new Widget()
    ]);
};

hg.app(document.body, App(), App.render);
