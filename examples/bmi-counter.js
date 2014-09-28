var document = require('global/document');
var hg = require('../index.js');
var h = require('../index.js').h;

var SafeHook = require('./lib/safe-hook.js');

function App() {
    var state = hg.struct({
        height: hg.value(180),
        weight: hg.value(80),
        bmi: hg.value(calcBmi(180, 80)),
        handles: hg.value(null)
    });

    state.handles.set(hg.handles({
        heightChange: updateData.bind(null, 'height'),
        weightChange: updateData.bind(null, 'weight'),
        bmiChange: updateData.bind(null, 'bmi')
    }, state));

    return state;
}

function slider(value, sink, min, max) {
    return h('input.slider', {
        type: SafeHook('range'), // SafeHook for IE9 + type='range'
        min: min, max: max, value: String(value),
        style: { width: '100%' }, name: 'slider',
        'ev-event': hg.changeEvent(sink)
    });
}

App.render = function render(state) {
    var handles = state.handles;
    var color = state.bmi < 18.5 ? 'orange' :
        state.bmi < 25 ? 'inherit' :
        state.bmi < 30 ? 'orange' : 'red';
    var diagnose = state.bmi < 18.5 ? 'underweight' :
        state.bmi < 25 ? 'normal' :
        state.bmi < 30 ? 'overweight' : 'obese';

    return h('div', [
        h('h3', 'BMI calculator'),
        h('div.weight', [
            'Weight: ' + ~~state.weight + 'kg',
            slider(state.weight, handles.weightChange, 30, 150)
        ]),
        h('div.height', [
            'Height: ' + ~~state.height + 'cm',
            slider(state.height, handles.heightChange, 100, 220)
        ]),
        h('div.bmi', [
            'BMI: ' + ~~state.bmi + ' ',
            h('span.diagnose', {
                style: { color: color }
            }, diagnose),
            slider(state.bmi, handles.bmiChange, 10, 50)
        ])
    ]);
};

function updateData(type, state, data) {
    state[type].set(Number(data.slider));

    if (type !== 'bmi') {
        state.bmi.set(calcBmi(state.height(), state.weight()));
    } else {
        state.weight.set(calcWeight(state.height(), state.bmi()));
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

hg.app(document.body, App(), App.render);
