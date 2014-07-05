var test = require('tape');
var path = require('path');
var event = require('synthetic-dom-events');
var document = require('min-document');
var raf = require('raf');

var loadExample = require('./lib/load-example.js');
var embedComponent = require('./lib/embed-component.js');

var src = path.join(__dirname, '../examples/count.js');
var count = loadExample(src);

test('count state is a number', function t(assert) {
    assert.equal(typeof count.state(), 'number');

    assert.end();
});

test('count increments on click', function t(assert) {
    var comp = embedComponent(count);

    var button = document.getElementsByClassName('button')[0];

    button.dispatchEvent(event('click'));
    button.dispatchEvent(event('click'));

    assert.equal(count.state(), 2);

    raf(afterRender);

    function afterRender() {
        var elem = comp.target.childNodes[0].childNodes[2];

        assert.equal(elem.data, ' has value: 2.');

        comp.destroy();

        assert.end();
    }
});
