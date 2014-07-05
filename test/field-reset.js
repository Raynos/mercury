var test = require('tape');
var path = require('path');
var document = require('global/document');
var raf = require('raf');
var event = require('synthetic-dom-events');

var embedComponent = require('./lib/embed-component.js');

var fieldReset;
if (typeof window !== 'undefined') {
    fieldReset = require('../examples/field-reset.js');
} else {
    var src = path.join(__dirname, '..', 'examples', 'field-reset.js');
    var loadExample = require('./lib/load-example.js');
    fieldReset = loadExample(src);
}

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
