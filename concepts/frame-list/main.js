var mercury = require("mercury")

var FrameList = require("./views/frame-list")
var FrameEditor = require("./views/frame-editor")
var FrameData = require("./data/frames")

// Load the data
var initialFrameData = FrameData.load()

// Create the default view using the frame set
var frameListEditor = FrameList(frames)

var state = mercury.hash({
    frames: mercury.hash(initialFrameData),
    editor: mercury.value(frameListEditor)
})

// When the data changes, save it
state.frames(frameData.save)

// Show the frame editor
frameListEditor.onSelectFrame(function (frameId) {
    var editor = FrameEditor(state.frames[frameId])

    state.editor.set(editor)

    editor.onExit(function () {
        // Restore the frame list
        state.editor.set(frameListEditor)
    })
})

function render(state) {
    // This is a mercury partial rendered with editor.state instead 
    // of globalSoup.state
    // The immutable internal event list is also passed in
    // Event listeners are obviously not serializable, but 
    // they can expose their state (listener set)
    return h(state.editor.partial())
}

// setup the loop and go.
mercury.app(document.body, render, state)
