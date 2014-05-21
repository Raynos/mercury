var mercury = require('../../../index')
var h = mercury.h
var textarea = require('./textarea')
var mdRender = require('./mdRender')

sideBySideMdEditor.render = sideBySideMdEditorRender

module.exports = sideBySideMdEditor

function sideBySideMdEditor(options) {
	options = options || {}

	var editor = textarea({
		value: options.value,
		placeholder: options.placeholder,
		name: options.name
	})
	var renderer = mdRender({ value: options.value })
	var state = mercury.hash({
		editor: editor,
		renderer: renderer
	})

	editor.value(renderer.value.set)

	return state
}

function sideBySideMdEditorRender(state) {
	return h('.sideBySideMdEditor', [
		textarea.render(state.editor),
		mdRender.render(state.renderer)
	])
}


