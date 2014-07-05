var SingleEvent = require("geval/single")
var MultipleEvent = require("geval/multiple")

/*
    Pro tip: Don't require `mercury` itself.
      require and depend on all these modules directly!
*/
var mercury = module.exports = {
    // Entry
    main: require("main-loop"),
    app: app,

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
    struct: require("observ-struct"),
    // alias struct as hash for back compat
    hash: require("observ-struct"),
    varhash: require("observ-varhash"),
    value: require("observ"),

    // Render
    diff: require("virtual-dom/diff"),
    patch: require("virtual-dom/patch"),
    partial: require("vdom-thunk"),
    create: require("virtual-dom/create-element"),
    h: require("virtual-hyperscript"),
    svg: require("virtual-hyperscript/svg"),

    // Utilities
    computed: require("observ/computed"),
    watch: require("observ/watch")
}

function input(names) {
    if (!names) {
        return SingleEvent()
    }

    return MultipleEvent(names)
}

function app(elem, observ, render, opts) {
    mercury.Delegator(opts);
    var loop = mercury.main(observ(), render, opts)
    if (elem) {
        elem.appendChild(loop.target)
    }
    return observ(loop.update)
}
