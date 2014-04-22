var mercury = require("mercury")

var frameList = require("./views/frame-list")
var frameEditor = require("./views/frame-editor")
var frameData = require("./data/frames")

// Load the data
var frames = mercury.hash(frameData.load())
// When the data changes, save it
frames(frameData.save)

// Create the default view using the frame set
var frameListEditor = frameList(frames)

var state = mercury.hash({
    frames: frames,
    editor: frameList
})

// Show the frame editor
frameListEditor.onSelectFrame(function (frameId) {
    var editor = frameEditor(frames[frameId])
    
    editor.onExit(function () {
        // Restore the frame list
        state.editor.set(frameList)
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
