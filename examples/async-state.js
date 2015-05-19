'use strict';

var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;

function App() {
    var state = hg.state({
        isUpdated: hg.value(false),
    });
    // Arrange for state to be updated asynchronously
    setTimeout(function() {
      state.isUpdated.set(true);
    }, 2000);
    return state;
}

App.render = function render(state) {
    return h('div.counter', [
        'The state has been updated asynchronously: ' + state.isUpdated,
    ]);
};

hg.app(document.body, App(), App.render);
