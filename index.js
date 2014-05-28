var SingleEvent = require("geval/single")
var MultipleEvent = require("geval/multiple")

/*
    Pro tip: Don't require `mercury` itself.
      require and depend on all these modules directly!
*/
var mercury = module.exports = {
    // Entry
    main: require("main-loop"),

    // Input
    Delegator: require("dom-delegator"),
    input: input,
    event: require("value-event/event"),
    valueEvent: require("value-event/value"),
    submitEvent: require("value-event/submit"),
    changeEvent: require("value-event/change"),
    keyEvent: require("value-event/key"),

    // State
    array: require("observ-array"),
    hash: require("observ-hash"),
    value: require("observ"),
    computed: require("observ/computed"),

    // Render
    diff: require("virtual-dom/diff"),
    patch: require("virtual-dom/patch"),
    partial: require("vdom-thunk"),
    create: require("virtual-dom/create-element"),
    h: require("virtual-hyperscript"),
    svg: require("virtual-hyperscript/svg"),

    // Utility
    app: app
}

function input(names) {
    if (!names) {
        return SingleEvent()
    }

    return MultipleEvent(names)
}

function app(elem, observ, render) {
    mercury.Delegator();
    var loop = mercury.main(observ(), render)
    observ(loop.update)
    elem.appendChild(loop.target)
}
