var mercury = require("mercury")


module.exports = createFrameList

// @state - snapshot of internal state
// @events - collection of internal event inputs
// @optional - argument passed into widget.thunk, not used
function frameList(state, events, optional) {
    return h("ul.frame-list", map(state.thumbnails, function (frame) {
        return h("li.frame-list-item", {
            "className": state.lastSelected === frame.id ? "highlighed" : "",
            "ex-click": mercury.event(events.frameClick, frame)
        }, [h("img", { src: frame.imageSrc })])
    }))
}

function createFrameList(state) {
    // INTERNAL VIEW STATE: turn each frame into an internal thumbnail
    // You don't need this information. This shouldn't need to leak
    // outisde of this scope. I shouldn't have to compute this externally
    // I shouldn't have to mutate global state with a new key for my purpose
    // The internal state is still readable. This is still ref transparent
    // and this is still immutable.
    var thumbnails = mercury.hash(map(state.frames, function (frame) {
        return thumbnailify(frame)
    }))
    
    var state = mercury.hash({
        thumbnails: thumbnails,
        lastSelect: null
    })
    
    // Events for consumers to listen to
    // It's nice to export a set of events that we can inspect
    // instead of injecting the listeners blindly.
    // +1 self documenting code and readability
    var publicEvents = {
        onSelectFrame = mercury.io()
    }
    
    // Events to listen to internally on the dom
    // We probably don't want to expose this internal concern
    var internalEvents = {
        frameClick: mercury.io(function (frame) {
            // We can just write the value straight out here.
            // But we could also write to the state if we wanted
            // and allow state changes to drive the events
            publicEvents.onSelectFrame.output(frame.id)
            state.lastSelected.set(frame.id)
        })
    }

    
    return new AutonymousWidget(state, frameList, internalEvents, publicEvents)
}


function AutonymousWidget(state, render, internalEvents, publicEvents) {
    this.state = state
    this._render = render
    
    // Export the public events output only (readable/source)
    // Here we have a true notion of only being able to read this 
    // event externally
    Object.keys(publicEvents).forEach(function (eventName) {
        this[eventName] = publicEvents[eventName].output
    })
    
    var internal = this._internalEvents {}
    
    // Persist the private events listeners only (writable/sink)
    Object.keys(privateEvents).forEach(function (eventName) {
        internal[eventName] = internalEvents[eventName].input
    })
}

AnonymousWidget.prototype.partial = function (optional) {
    return mercury.partial(this._render, this.state(),
        this._internalEvents, optional)
}
