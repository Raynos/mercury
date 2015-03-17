var nextTick = require("next-tick")

module.exports = Transition

function Transition(value, propName) {
    if (!(this instanceof Transition)) {
        return new Transition(value)
    }

    this.value = value
    this.property = propName
}

Transition.prototype.hook = function setOnNextTick(domNode, propName) {
    var value = this.value
    var property = this.property

    if (property === null || property === undefined) {
        property = propName
    }

    if (domNode[property]) {
        nextTick(function () {
            console.log(domNode, propName)
            domNode[property] = value
        })
    } else {
        domNode[property] = value
    }
}