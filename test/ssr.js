'use strict';

var mercury = require('../index.js');
var h = mercury.h;
var document = require('global/document');
var test = require('tape');
var virtualize = require('vdom-virtualize');
var raf = require('raf');

test('Can reattach in the client', function t(assert) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode('Hello world'));
    document.body.appendChild(div);

    function render(name) {
        return h('div', 'Hello ' + name);
    }

    var state = mercury.value('venus');

    mercury.app(true, state, render, {
        target: div,
        initialTree: virtualize(div)
    });
    state.set(state());

    raf(function afterRender() {
        var tn = document.body.childNodes[0].childNodes[0];

        assert.equal(tn.data, 'Hello venus', 'Element was updated');

        document.body.removeChild(document.body.childNodes[0]);
        assert.end();
    });

});
