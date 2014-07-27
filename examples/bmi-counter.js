var document = require('global/document');
var mercury = require('../index.js');
var h = mercury.h;

var SafeHook = require('./lib/safe-hook.js');

var events = mercury.input(['height', 'weight', 'bmi']);
var bmiData = mercury.struct({
    height: mercury.value(180),
    weight: mercury.value(80),
    bmi: mercury.value(calcBmi(180, 80))
});

events.height(updateData.bind(null, 'height'));
events.weight(updateData.bind(null, 'weight'));
events.bmi(updateData.bind(null, 'bmi'));

function updateData(type, data) {
    bmiData[type].set(Number(data.slider));

    if (type !== 'bmi') {
        bmiData.bmi.set(calcBmi(bmiData.height(), bmiData.weight()));
    } else {
        bmiData.weight.set(calcWeight(bmiData.height(), bmiData.bmi()));
    }
}

function calcWeight(height, bmi) {
    var meterz = height / 100;
    return meterz * meterz * bmi;
}

function calcBmi(height, weight) {
    var meterz = height / 100;
    return weight / (meterz * meterz);
}

function slider(value, sink, min, max) {
    return h('input.slider', {
        type: SafeHook('range'), // SafeHook for IE9 + type='range'
        min: min, max: max, value: String(value),
        style: { width: '100%' }, name: 'slider',
        'ev-event': mercury.changeEvent(sink)
    });
}

function render(values) {
    var color = values.bmi < 18.5 ? 'orange' :
        values.bmi < 25 ? 'inherit' :
        values.bmi < 30 ? 'orange' : 'red';
    var diagnose = values.bmi < 18.5 ? 'underweight' :
        values.bmi < 25 ? 'normal' :
        values.bmi < 30 ? 'overweight' : 'obese';

    return h('div', [
        h('h3', 'BMI calculator'),
        h('div.weight', [
            'Weight: ' + ~~values.weight + 'kg',
            slider(values.weight, events.weight, 30, 150)
        ]),
        h('div.height', [
            'Height: ' + ~~values.height + 'cm',
            slider(values.height,
                events.height, 100, 220)
        ]),
        h('div.bmi', [
            'BMI: ' + ~~values.bmi + ' ',
            h('span.diagnose', {
                style: { color: color }
            }, diagnose),
            slider(values.bmi, events.bmi, 10, 50)
        ])
    ]);
}

mercury.app(document.body, bmiData, render);
