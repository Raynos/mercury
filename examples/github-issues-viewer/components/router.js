var mercury = require("../../../index.js")
var source = require("geval/source")
var window = require("global/window")
var document = require("global/document")

module.exports = Router

function Router() {
    var inPopState = false
    var atom = mercury.value(String(document.location.pathname))
    var popstates = popstate()

    popstates(onPopState)
    atom(onRouteSet)

    return { state: atom }

    function onPopState(uri) {
        inPopState = true
        atom.set(uri)
    }

    function onRouteSet(uri) {
        if (inPopState) {
            inPopState = false
            return
        }

        pushHistoryState(uri)
    }
}

function pushHistoryState(uri) {
    window.history.pushState(undefined, undefined, uri)
}

function popstate() {
    return source(function (broadcast) {
        window.addEventListener("popstate", function (ev) {
            broadcast(String(document.location.pathname))
        })
    })
}
