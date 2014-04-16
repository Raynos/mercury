var mercury = require("../index.js")
var h = mercury.h

var events = mercury.input(["height", "weight", "bmi"])
var bmiData = mercury.hash({
    height: mercury.value(180),
    weight: mercury.value(80),
    bmi: mercury.value(null)
})

function updateData(type, data) {
    bmiData[type].set(data.slider)
    bmiData[type === "bmi" ? "weight" : "bmi"].set(null)
}

events.height(updateData.bind(null, "height"))
events.weight(updateData.bind(null, "weight"))
events.bmi(updateData.bind(null, "bmi"))

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
            mercury.partial(slider, values.weight, events.weight, 30, 150)
        ]),
        h("div", [
            "Height: " + ~~values.height + "cm",
            mercury.partial(slider, values.height,
                events.height, 100, 220)
        ]),
        h("div", [
            "BMI: " + ~~values.bmi + " ",
            h("span", { style: { color: color } }, diagnose),
            mercury.partial(slider, values.bmi, events.bmi, 10, 50)
        ])
    ])
}

mercury.app(document.body, bmiData, render)
