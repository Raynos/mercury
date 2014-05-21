var mercury = require('../../../index')
var h = mercury.h
var parseMarkdown = require('marked/lib/marked')

mdRender.render = mdRenderRender
mdRender.input = input

module.exports = mdRender

function mdRender(options) {
	var events = input()
	var state = mercury.hash({
		events: events,
		value: mercury.value(options.value || '')
	})

	return state
}

function input() {
	return mercury.input([ 'click' ])
}

function mdRenderRender(state) {
	var events = state.events

	return h('.markdown', {
		'data-click': events.click
	}, [
		// using a nested node due to a bug with innerHTML in vtree
		h('', { innerHTML: parseMarkdown(state.value) })
	])
}
