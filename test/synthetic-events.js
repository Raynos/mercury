var mercury = require('../index.js');
var h = mercury.h;
var event = require('synthetic-dom-events');
var document = require('min-document');
var test = require('tape');

test('events happen', function (assert) {
    var callCount = 0;

    var click = mercury.input();

    click(function() {
        callCount++;
    });

    function render(onClick) {
        return h('button', {
            'ev-click': mercury.event(onClick)
        }, 'Click Me');
    }

    var div = document.createElement('div');
    mercury.app(div, mercury.value(click), render, {
        document: document
    });

    document.body.appendChild(div);

    // action
    div.childNodes[0].dispatchEvent(
        event('click', {bubbles: true})
    );

    // assert
    assert.equal(callCount, 1);
    assert.end();
})
