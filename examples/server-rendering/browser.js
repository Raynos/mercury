var mercury = require('../../index.js')
var virtualize = require('vdom-virtualize')
var JSONGlobals = require('json-globals/get')

var render = require('./render.js')

var initialState = JSONGlobals('state')
var state = mercury.struct({
    description: mercury.value(initialState.description),
    events: mercury.input(['add']),
    items: mercury.array(initialState.items)
})

state.events.add(function (data) {
    state.items.push({
        name: data.name
    })
})

var targetElem = document.body.firstChild
var prevTree = virtualize(targetElem)

mercury.app(null, state, render, {
    initialTree: prevTree,
    target: targetElem
})

state.set(state())
