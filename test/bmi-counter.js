var raf = require('raf');
var test = require('tape');
var document = require('global/document');
var event = require('synthetic-dom-events');

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

    var sliders = document.getElementsByClassName('slider');
    var diagnose = document
        .getElementsByClassName('diagnose')[0];

    assert.equal(sliders.length, 3);
    assert.equal(sliders[0].value, '80');
    assert.equal(sliders[1].value, '180');
    assert.equal(Number(sliders[2].value).toFixed(0), '25');

    assert.equal(diagnose.childNodes[0].data, 'normal');
    assert.equal(diagnose.style.color, 'inherit');

    comp.destroy();
    assert.end();
});

test('update weight', function t(assert) {
    var comp = embedComponent(bmiCounter);

    var slider = document.getElementsByClassName('slider')[0];

    slider.value = '120';
    slider.dispatchEvent(event('input'));

    raf(function afterRender() {
        assert.equal(comp.state().weight, 120);

        var sliders = document
            .getElementsByClassName('slider');
        var diagnose = document
            .getElementsByClassName('diagnose')[0];

        assert.equal(sliders[0].value, '120');
        assert.equal(sliders[1].value, '180');
        assert.equal(Number(sliders[2].value).toFixed(0), '37');

        assert.equal(diagnose.childNodes[0].data, 'obese');
        assert.equal(diagnose.style.color, 'red');

        comp.destroy();
        assert.end();
    });
});

test('update height', function t(assert) {
    var comp = embedComponent(bmiCounter);

    var slider = document.getElementsByClassName('slider')[1];

    slider.value = '210';
    slider.dispatchEvent(event('input'));

    raf(function afterRender() {
        assert.equal(comp.state().height, 210);
        assert.equal(comp.state().weight, 80);

        var sliders = document
            .getElementsByClassName('slider');
        var diagnose = document
            .getElementsByClassName('diagnose')[0];

        assert.equal(sliders[0].value, '80');
        assert.equal(sliders[1].value, '210');
        assert.equal(Number(sliders[2].value).toFixed(0), '18');

        assert.equal(diagnose.childNodes[0].data, 'underweight');
        assert.equal(diagnose.style.color, 'orange');

        comp.destroy();
        assert.end();
    });
});

test('update bmi', function t(assert) {
    var comp = embedComponent(bmiCounter);

    var slider = document.getElementsByClassName('slider')[2];

    slider.value = '27';
    slider.dispatchEvent(event('input'));

    raf(function afterRender() {
        assert.equal(comp.state().height, 180);
        assert.equal(comp.state().weight, 87.48);

        var sliders = document
            .getElementsByClassName('slider');
        var diagnose = document
            .getElementsByClassName('diagnose')[0];

        assert.equal(Number(sliders[0].value).toFixed(0), '87');
        assert.equal(sliders[1].value, '180');
        assert.equal(Number(sliders[2].value).toFixed(0), '27');

        assert.equal(diagnose.childNodes[0].data, 'overweight');
        assert.equal(diagnose.style.color, 'orange');

        comp.destroy();
        assert.end();
    });
});
