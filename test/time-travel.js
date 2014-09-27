var test = require('tape');
var mercury = require("../index.js")
var events = mercury.input(["change"])
var TimeTravel = require('../time-travel.js')

test('change', function t(assert) {
    var state = mercury.struct({ label: mercury.value(0) })
    state.label.set(1)
    assert.equal(state().label, 1)
    assert.end()
})

test('undo', function t(assert) {
    var state = mercury.struct({ label: mercury.value(0) })
    var history = TimeTravel(state)
    var undo = history.undo
    state.label.set(1)
    undo()
    assert.equal(state().label, 0)
    assert.end()
})

test('undo then redo', function t(assert) {
    var state = mercury.struct({ label: mercury.value(0) })
    var history = TimeTravel(state)
    var undo = history.undo
    var redo = history.redo
    state.label.set(1)
    undo()
    redo()
    assert.equal(state().label, 1)
    assert.end()
})

test('undo at beginning', function t(assert) {
    var state = mercury.struct({ label: mercury.value(0) })
    var history = TimeTravel(state)
    var undo = history.undo
    state.label.set(1)
    undo()
    undo()
    assert.equal(state().label, 0)
    assert.end()
})

test('redo at end', function t(assert) {
    var state = mercury.struct({ label: mercury.value(0) })
    var history = TimeTravel(state)
    var redo = history.redo
    state.label.set(1)
    redo()
    assert.equal(state().label, 1)
    assert.end()
})

test('undo then change', function t(assert) {
    var state = mercury.struct({ label: mercury.value(0) })
    var history = TimeTravel(state)
    var undo = history.undo
    state.label.set(1)
    undo()
    state.label.set(2)
    assert.equal(state().label, 2)
    assert.end()
})

test('undo then change then redo', function t(assert) {
    var state = mercury.struct({ label: mercury.value(0) })
    var history = TimeTravel(state)
    var undo = history.undo
    var redo = history.redo
    state.label.set(1)
    undo()
    state.label.set(2)
    redo()
    assert.equal(state().label, 2)
    assert.end()
})
