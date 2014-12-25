'use strict';

var h = require('../../../index.js').h;
var sendClick = require('value-event/click.js');

var routeAtom = require('./index.js').atom;

module.exports = anchor;

function anchor(props, text) {
    var href = props.href;
    props.href = '#';

    props['ev-click'] = sendClick(pushState, null, {
        ctrl: false,
        meta: false,
        rightClick: false,
        preventDefault: true
    });

    return h('a', props, text);

    function pushState() {
        routeAtom.set(href);
    }
}
