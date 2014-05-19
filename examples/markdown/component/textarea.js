var mercury = require('../../../index')
var h = mercury.h
var doMutableFocus = require('../../todomvc/lib/do-mutable-focus')
var update = {
	// this needs to be input rather than change so that the pre expands as text
	// is entered into the textarea
	input: function (state, e) {
		state.value.set(e.target.value)
	},
	change: function (state, e) {
		// trim the content on a change event
		state.value.set(e.target.value.trim())
	}
}

textarea.render = textareaRender
textarea.update = update
textarea.input = input

module.exports = textarea

function textarea(options) {
	options = options || {}

	var events = input()
	var state = mercury.hash({
		events: events,
		value: mercury.value(options.value || ''),
		placeholder: mercury.value(options.placeholder || ''),
		name: mercury.value(options.name || ''),
		shouldFocus: options.shouldFocus
	})

	events.input(update.input.bind(null, state))
	events.change(update.change.bind(null, state))

	return state
}

function input() {
	return mercury.input([ 'blur', 'change', 'input' ])
}

function textareaRender(state) {
	var events = state.events

	return h('.textarea', [
		h('textarea.expanding', {
			'data-blur': mercury.event(events.blur),
			'data-change': events.change,
			'data-input': events.input,
			'data-focus': state.shouldFocus ? doMutableFocus() : null,
			name: state.name,
			placeholder: state.placeholder,
			value: state.value
		}),
		h('pre', [
			h('span', state.value),
			h('br')
		])
	])
}
