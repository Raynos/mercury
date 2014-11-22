'use strict';

var SingleEvent = require('geval/single');
var MultipleEvent = require('geval/multiple');

/*
    Pro tip: Don't require `mercury` itself.
      require and depend on all these modules directly!
*/
var mercury = module.exports = {
    // Entry
    main: require('main-loop'),
    app: app,

    // Input
    Delegator: require('dom-delegator'),
    input: input,
    handles: handles,
    event: require('value-event/event'),
    valueEvent: require('value-event/value'),
    submitEvent: require('value-event/submit'),
    changeEvent: require('value-event/change'),
    keyEvent: require('value-event/key'),

    // State
    array: require('observ-array'),
    struct: require('observ-struct'),
    // deprecated: alias struct as hash for back compat
    hash: require('observ-struct'),
    varhash: require('observ-varhash'),
    value: require('observ'),

    // Render
    diff: require('vtree/diff'),
    patch: require('vdom/patch'),
    partial: require('vdom-thunk'),
    create: require('vdom/create-element'),
    h: require('virtual-hyperscript'),
    // deprecated: keep for back compat.
    svg: require('virtual-hyperscript/svg'),

    // Utilities
    // deprecated: keep for back compat.
    computed: require('observ/computed'),
    watch: require('observ/watch')
};

function input(names) {
    if (!names) {
        return SingleEvent();
    }

    return MultipleEvent(names);
}

function handles(funcs, context) {
    return Object.keys(funcs).reduce(createHandle, {});

    function createHandle(acc, name) {
        var handle = mercury.Delegator.allocateHandle(
            funcs[name].bind(null, context));

        acc[name] = handle;
        return acc;
    }
}

function app(elem, observ, render, opts) {
    mercury.Delegator(opts);
    var loop = mercury.main(observ(), render, opts);
    if (elem) {
        elem.appendChild(loop.target);
    }
    return observ(loop.update);
}
