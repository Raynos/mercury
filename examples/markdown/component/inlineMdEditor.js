var mercury = require('../../../index')
var h = mercury.h
var textarea = require('./textarea')
var mdRender = require('./mdRender')
var update = {
	editorBlur: function (state) {
		var text = state.editor.value().trim()

		state.editor.shouldFocus.set(false)
		state.editor.value.set(text)
		state.isEditing.set(!text)
	},
	rendererClick: function (state) {
		state.editor.shouldFocus.set(true)
		state.isEditing.set(true)
	}
}

inlineMdEditor.render = inlineMdEditorRender
inlineMdEditor.update = update

module.exports = inlineMdEditor

function inlineMdEditor(options) {
	options = options || {}

	var editor = textarea({
		value: options.value,
		placeholder: options.placeholder,
		name: options.name
	})
	var renderer = mdRender({ value: options.value })
	var state = mercury.hash({
		editor: editor,
		renderer: renderer,
		// if no initial value, show the editor
		isEditing: mercury.value(!options.value)
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

