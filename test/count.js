var test = require('tape');
var path = require('path');
var requireModify = require('require-modify');
var event = require('synthetic-dom-events');
var document = require('min-document');
var raf = require('raf');

var mercury = require('../index.js');

var appRegex = /mercury\.app\([\w\.]+,\s([\w]+),\s([\w]+)\)/

var src = path.join(__dirname, '../examples/count.js')
var count = requireModify(src, function (source) {
    source = source.replace(appRegex,
        function (match, state, render) {
            return 'module.exports = {\n' +
                '    state: ' + state + ',\n' +
                '    render: ' + render + '\n' +
                '}'
        })

    return source
});

test('count state is a number', function (assert) {
    assert.equal(typeof count.state(), 'number');
    
    assert.end();
});

test('count increments on click', function (assert) {
    var div = document.createElement('div')
    document.body.appendChild(div)

    var remove = mercury.app(div, count.state, count.render)

    var button = document.getElementsByClassName('button')[0];

    button.dispatchEvent(event('click'))
    button.dispatchEvent(event('click'))

    assert.equal(count.state(), 2);

    raf(function () {
        var elem = div.childNodes[0].childNodes[2];
        console.log('elem', elem.data);

        assert.equal(elem.data, ' has value: 2.');

        assert.end();

        count.state.set(0);
        document.body.removeChild(div);
        remove();
    })
});
