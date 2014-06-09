var test = require('tape');
var path = require('path');
var event = require('synthetic-dom-events');
var document = require('min-document');
var raf = require('raf');

var loadExample = require('./lib/load-example.js')
var embedComponent = require('./lib/embed-component.js')

var src = path.join(__dirname, '../examples/shared-state.js')
var shared = loadExample(src)

test('shared state is a string', function (assert) {
    assert.equal(typeof shared.state(), 'string');
    
    assert.end();
});

test('syncing state to DOM', function (assert) {
    var comp = embedComponent(shared)

    comp.state.set('foobar')

    raf(function () {
        var content = document.getElementsByClassName('content')[0]

        assert.equal(content.childNodes[0].data,
            'The value is now: foobar')

        var input = document.getElementsByClassName('input')[0]

        assert.equal(input.value, 'foobar')

        comp.destroy()

        assert.end()
    })
})

test('syncing from the DOM', function (assert) {
    var comp = embedComponent(shared)

    var input = document.getElementsByClassName('input')[0]
    input.value = 'foobar'

    input.dispatchEvent(event('input', {
        bubbles: true
    }))

    assert.equal(comp.state(), 'foobar')

    raf(function () {
        var content = document.getElementsByClassName('content')[0]

        assert.equal(content.childNodes[0].data,
            'The value is now: foobar')

        comp.destroy()

        assert.end()
    })
})
