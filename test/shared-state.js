var test = require('tape');
var event = require('synthetic-dom-events');
var document = require('global/document');
var raf = require('raf');

if (typeof window === 'undefined') {
    require('./lib/load-hook.js');
}

var embedComponent = require('./lib/embed-component.js');
var shared = require('../examples/shared-state.js');

test('shared state is a string', function t(assert) {
    assert.equal(typeof shared.state().text, 'string');

    assert.end();
});

test('syncing state to DOM', function t(assert) {
    var comp = embedComponent(shared);

    comp.state.text.set('foobar');

    raf(function afterRender() {
        var content = document.getElementsByClassName('content')[0];

        assert.equal(content.childNodes[0].data,
            'The value is now: foobar');

        var input = document.getElementsByClassName('input')[0];

        assert.equal(input.value, 'foobar');

        comp.destroy();

        assert.end();
    });
});

test('syncing from the DOM', function t(assert) {
    var comp = embedComponent(shared);

    var input = document.getElementsByClassName('input')[0];
    input.value = 'foobar';

    input.dispatchEvent(event('input', {
        bubbles: true
    }));

    assert.equal(comp.state().text, 'foobar');

    raf(function afterRender() {
        var content = document.getElementsByClassName('content')[0];

        assert.equal(content.childNodes[0].data,
            'The value is now: foobar');

        comp.destroy();

        assert.end();
    });
});
