/*
    Pro tip: Don't require `mercury` itself.
      require and depend on all these modules directly!
*/
var mercury = module.exports = {
    // Entry
    main: require("main-loop"),

    // Input
    Delegator: require("dom-delegator"),
    Events: require("geval/multiple"),
    event: require("value-event/event"),
    valueEvent: require("value-event/value"),
    submitEvent: require("value-event/submit"),
    changeEvent: require("value-event/change"),
    keyEvent: require("value-event/key"),

    // State
    array: require("observ-array"),
    hash: require("observ-hash"),
    value: require("observ"),

    // Render
    diff: require("virtual-dom/diff"),
    patch: require("virtual-dom/patch"),
    partial: require("vdom-thunk"),
    create: require("virtual-dom/create-element"),
    h: require("virtual-hyperscript"),
    svg: require("virtual-hyperscript/svg"),

    // Utility
    app: app,
    input: input
}

function app(elem, observ, render) {
    var loop = mercury.main(observ(), render)
    observ(loop.update)
    elem.appendChild(loop.target)
}

function input(names) {
    var delegator = mercury.Delegator()
    return mercury.Events(names)
}
