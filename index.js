/*
    Pro tip: Don't require `mercury` itself.
      require and depend on all these modules directly!
*/
module.exports = {
    // Entry
    main: require("main-loop"),

    // Input
    Delegator: require("dom-delegator"),
    EventSinks: require("event-sinks/geval"),
    event: require("value-event/event"),
    valueEvent: require("value-event/value"),
    submitEvent: require("value-event/submit"),
    changeEvent: require("value-event/change"),

    // State
    array: require("observ-array"),
    hash: require("observ-hash"),
    value: require("observ"),

    // Render
    diff: require("virtual-dom/diff"),
    patch: require("virtual-dom/patch"),
    partial: require("vdom-thunk"),
    create: require("virtual-dom/render"),
    h: require("virtual-dom/h")
}
