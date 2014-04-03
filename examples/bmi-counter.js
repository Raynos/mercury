var mercury = require("../index.js")
var h = mercury.h

var delegator = mercury.Delegator()
var inputs = mercury.EventSinks(delegator.id, ["height", "weight", "bmi"])
var bmiData = mercury.hash({
    height: mercury.value(180),
    weight: mercury.value(80),
    bmi: mercury.value(null)
})

function updateData(type, data) {
    bmiData[type].set(data.currentValue.slider)
    bmiData[type === "bmi" ? "weight" : "bmi"].set(null)
}

inputs.events.height(updateData.bind(null, "height"))
inputs.events.weight(updateData.bind(null, "weight"))
inputs.events.bmi(updateData.bind(null, "bmi"))

function calcBmi(data) {
    var h = data.height / 100
    return {
        height: data.height,
        bmi: data.bmi ? data.bmi : data.weight / (h * h),
        weight: data.bmi ? data.bmi * (h * h) : data.weight
    }
}

function slider(value, sink, min, max) {
    return h("input", {
        type: "range", min: min, max: max, value: value,
        style: { width: "100%" }, name: "slider",
        "data-event": mercury.changeEvent(sink)
    })
}

function render(bmiData) {
    var values = calcBmi(bmiData)
    var color = values.bmi < 18.5 ? "orange" :
        values.bmi < 25 ? "inherit" :
        values.bmi < 30 ? "orange" : "red"
    var diagnose = values.bmi < 18.5 ? "underweight" :
        values.bmi < 25 ? "normal" :
        values.bmi < 30 ? "overweight" : "obese"

    return h("div", [
        h("h3", "BMI calculator"),
        h("div", [
            "Weight: " + ~~values.weight + "kg",
            mercury.partial(slider, values.weight, inputs.sinks.weight, 30, 150)
        ]),
        h("div", [
            "Height: " + ~~values.height + "cm",
            mercury.partial(slider, values.height,
                inputs.sinks.height, 100, 220)
        ]),
        h("div", [
            "BMI: " + ~~values.bmi + " ",
            h("span", { style: { color: color } }, diagnose),
            mercury.partial(slider, values.bmi, inputs.sinks.bmi, 10, 50)
        ])
    ])
}


var loop = mercury.main(bmiData(), render)
bmiData(loop.update)
document.body.appendChild(loop.target)
