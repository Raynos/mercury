'use strict';

var hg = require('../../index.js');
var h = hg.h;

module.exports = function render(state) {
    return h('div.counter', [
        'The state ', h('code', 'count'),
        ' has value: ' + state.count + '.', h('input.button', {
            type: 'button',
            value: 'Click me!',
            'ev-click': hg.send(state.channels.clicks)
        })
    ]);
};
