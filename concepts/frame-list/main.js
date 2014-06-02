var mercury = require("mercury")

var FrameList = require("./apps/frame-list")
var FrameEditor = require("./apps/frame-editor")
var FrameData = require("./data/frames")

// Load the data
var initialFrameData = FrameData.load()

var frames = mercury.struct(initialFrameData)
var currentFrame = mercury.value(null)
// Create the frameList component using the frames data
// `frameList` is { state: state, events: events }
// we can collapse these two objects into one interface optionally
var frameList = FrameList(frames)
// `frameEditor` is { state: state, events: events }
var frameEditor = FrameEditor(currentFrame)

var state = mercury.struct({
    frames: frames,
    currentFrame: currentFrame,
    editor: frameEditor.state,
    frameList: frameList.state,
    editorVisible: mercury.value(false)
})

// When the data changes, save it
state.frames(frameData.save)

// Show the frame editor
frameList.events.onSelectFrame(function (frameId) {
    state.currentFrame.set(state.frames[frameId]())
    state.editorVisible.set(true)

    editor.events.onExit(function () {
        // Restore the frame list
        state.editorVisible.set(false)
    })
})

function render(state) {
    // This is a mercury partial rendered with the editor's state
    // The immutable internal event list is also passed in
    // Event listeners are obviously not serializable, but 
    // they can expose their state (listener set)
    return h(
        state.editorVisible ? FrameEditor.Render(state.editor) :
            FrameList.Render(state.frameList)
    )
}

// setup the loop and go.
mercury.app(document.body, render, state)
