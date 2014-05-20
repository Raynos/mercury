var mercury = require('../../../index')
var h = mercury.h
var textarea = require('./textarea')
var mdRender = require('./mdRender')
var update = {
	editorBlur: function (state, text) {
		state.focusEditor.set(false)
		state.isEditing.set(!text)
	},
	rendererClick: function (state) {
		state.focusEditor.set(true)
		state.isEditing.set(true)
	}
}

inlineMdEditor.render = inlineMdEditorRender
inlineMdEditor.update = update

module.exports = inlineMdEditor

function inlineMdEditor(options) {
	options = options || {}

	var focusEditor = mercury.value(false)
	var editor = textarea({
		value: options.value,
		placeholder: options.placeholder,
		name: options.name,
		shouldFocus: focusEditor
	})
	var renderer = mdRender({ value: options.value })
	var state = mercury.hash({
		editor: editor,
		renderer: renderer,
		// if no initial value, show the editor
		isEditing: mercury.value(!options.value),
		focusEditor: focusEditor
	})

	editor.value(renderer.value.set)

	editor.events.blur(update.editorBlur.bind(null, state))
	renderer.events.click(update.rendererClick.bind(null, state))

	return state
}

function inlineMdEditorRender(state) {
	return h('.inlineMdEditor', [
		state.isEditing ?
			textarea.render(state.editor) :
			mdRender.render(state.renderer)
	])
}

