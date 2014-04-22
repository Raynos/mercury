var mercury = require("mercury")

var FrameList = require("./apps/frame-list")
var FrameEditor = require("./apps/frame-editor")
var FrameData = require("./data/frames")

// Load the data
var initialFrameData = FrameData.load()

var frames = mercury.hash(initialFrameData)
// Create the default view using the frame set
var frameList = FrameList(frames)

var state = mercury.hash({
    frames: frames,
    editor: mercury.value(null),
    frameList: mercury.value(frameList)
})

// When the data changes, save it
state.frames(frameData.save)

// Show the frame editor
frameList.onSelectFrame(function (frameId) {
    var editor = FrameEditor(state.frames[frameId])

    state.editor.set(editor)
    state.frameList.set(null)

    editor.onExit(function () {
        // Restore the frame list
        state.frameList.set(frameList)
        state.editor.set(null)
    })
})

function render(state) {
    // This is a mercury partial rendered with editor.state instead 
    // of globalSoup.state
    // The immutable internal event list is also passed in
    // Event listeners are obviously not serializable, but 
    // they can expose their state (listener set)
    return h(
        state.editor ? state.editor.partial() :
            state.frameList.partial()
    )
}

// setup the loop and go.
mercury.app(document.body, render, state)
