var mercury = require("mercury")

createFrameList.Render = frameList

module.exports = createFrameList

// @state - snapshot of internal state
// @optional - argument passed into widget.thunk, not used
function frameList(state, optional) {
    var events = state._internalEvents

    return h("ul.frame-list", map(state.thumbnails, function (frame) {
        return h("li.frame-list-item", {
            "className": state.lastSelected === frame.id ? "highlighed" : "",
            "ex-click": mercury.event(events.frameClick, frame)
        }, [h("img", { src: frame.imageSrc })])
    }))
}

function createFrameList(parentState) {
    // INTERNAL VIEW STATE: turn each frame into an internal thumbnail
    // You don't need this information. This shouldn't need to leak
    // outisde of this scope. I shouldn't have to compute this externally
    // I shouldn't have to mutate global state with a new key for my purpose
    // The internal state is still readable. This is still ref transparent
    // and this is still immutable.
    var thumbnails = mercury.struct(map(parentState.frames, function (frame) {
        return thumbnailify(frame)
    }))
    
    var state = mercury.struct({
        thumbnails: thumbnails,
        lastSelect: mercury.value(null)
    })
    
    // Events for consumers to listen to
    // It's nice to export a set of events that we can inspect
    // instead of injecting the listeners blindly.
    // +1 self documenting code and readability
    var publicEvents = {
        // Only onSelectFrame.output is exported on the interface
        //  mercury.io(listener<function>?) -> { 
        //      input: function(value<any>),
        //      output: function(listener<function>)
        //  }
        //   
        //    returns an event object. An event consists of two function input and output
        //       write the       read the 
        //    --> input --> O --> output -->
        //               [Event]
        //
        //  If a function is provided to mercury.io, that is the default listener to the output  
        // 
        onSelectFrame = mercury.io()
    }
    
    // Events to listen to internally on the dom
    // We probably don't want to expose this internal concern
    var internalEvents = {
        // Only frameClick.input is passed into render
        frameClick: mercury.io(function (frame) {
            // We can just write the value straight out here.
            // But we could also write to the state if we wanted
            // and allow state changes to drive the events
            publicEvents.onSelectFrame.input(frame.id)
            state.lastSelected.set(frame.id)
        })
    }

    
    return AutonymousThing(state, internalEvents, publicEvents)
}


function AutonymousThing(state, internalEvents, publicEvents) {
    var events = {}
    state._internalEvents = {}
    
    // Export the public events output only (readable/source)
    // Here we have a true notion of only being able to read this 
    // event externally
    Object.keys(publicEvents).forEach(function (eventName) {
        events[eventName] = publicEvents[eventName].output
    })
    
    // Persist the private events listeners only (writable/sink)
    Object.keys(privateEvents).forEach(function (eventName) {
        state._internalEvents[eventName] =
            internalEvents[eventName].input
    })

    return { state: state, events: events }
}
