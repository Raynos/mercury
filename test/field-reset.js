var test = require('tape');
var document = require('global/document');
var raf = require('raf');
var event = require('synthetic-dom-events');

if (typeof window === 'undefined') {
    require('./lib/load-hook.js');
}

var embedComponent = require('./lib/embed-component.js');
var fieldReset = require('../examples/field-reset.js');

test('fieldReset state is an object', function t(assert) {
    var state = fieldReset.state();

    assert.equal(state.isReset, false);
    assert.ok(state.events);
    assert.ok(state.events.reset);

    assert.end();
});

test('resetting field on click', function t(assert) {
    var comp = embedComponent(fieldReset);

    var input = document.getElementsByClassName('input')[0];
    var button = document.getElementsByClassName('button')[0];

    input.value = 'hello';

    button.dispatchEvent(event('click'));

    assert.equal(fieldReset.state.isReset(), true);

    raf(function afterRender() {

        assert.equal(input.value, '');
        assert.equal(fieldReset.state.isReset(), false);

        comp.destroy();

        assert.end();
    });
});
