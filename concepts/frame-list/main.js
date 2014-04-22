var mercury = require("mercury")

var FrameList = require("./apps/frame-list")
var FrameEditor = require("./apps/frame-editor")
var FrameData = require("./data/frames")

// Load the data
var initialFrameData = FrameData.load()

var frames = mercury.hash(initialFrameData)
var currentFrame = mercury.value(null)
// Create the default view using the frame set
var frameList = FrameList(frames)
var frameEditor = FrameEditor(currentFrame)

var state = mercury.hash({
    frames: frames,
    currentFrame: currentFrame,
    editor: mercury.value(frameEditor),
    frameList: mercury.value(frameList),
    editorVisible: mercury.value(false)
})

// When the data changes, save it
state.frames(frameData.save)

// Show the frame editor
frameList.onSelectFrame(function (frameId) {
    state.currentFrame.set(state.frames[frameId])
    state.editorVisible.set(true)

    editor.onExit(function () {
        // Restore the frame list
        state.editorVisible.set(false)
    })
})

function render(state) {
    // This is a mercury partial rendered with editor.state instead 
    // of globalSoup.state
    // The immutable internal event list is also passed in
    // Event listeners are obviously not serializable, but 
    // they can expose their state (listener set)
    return h(
        state.editorVisible ? state.editor.partial() :
            state.frameList.partial()
    )
}

// setup the loop and go.
mercury.app(document.body, render, state)
