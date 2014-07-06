//var raf = require('raf');
var test = require('tape');

if (typeof window === 'undefined') {
    require('./lib/load-hook.js');
}

var embedComponent = require('./lib/embed-component.js');
var bmiCounter = require('../examples/bmi-counter.js');

test('bmi state', function t(assert) {
    var state = bmiCounter.state();

    assert.equal(state.height, 180);
    assert.equal(state.weight, 80);
    assert.equal(state.bmi.toFixed(2), '24.69');

    assert.end();
});

test('render bmi', function t(assert) {
    var comp = embedComponent(bmiCounter);



    comp.destroy();
    assert.end();
});
