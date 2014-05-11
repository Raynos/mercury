var mercury = require("../../../index.js")
var h = mercury.h
var extend = require("xtend")

var Update = {
    validRepo: validRepo,
    submitRepo: submitRepo,
    setRepo: setRepo
}

var RepoState = {
    currentRepo: "rails/rails"
}

RepoInput.Render = Render

module.exports = RepoInput

function RepoInput(initialState) {
    var state = extend(RepoState, initialState || {})

    var events = mercury.input(["setRepo", "submitRepo"])
    var atom = mercury.hash({
        events: events,
        currentRepo: mercury.value(state.currentRepo),
        repoText: mercury.value(state.currentRepo)
    })

    events.setRepo(Update.setRepo.bind(null, atom))
    events.submitRepo(Update.submitRepo.bind(null, atom))

    return { state: atom }
}

function validRepo(repoValue, repoText) {
    var parts = repoText.split("/")
    var disabled = repoText !== repoValue &&
        parts.length === 2 &&
        parts[0].length !== 0 &&
        parts[1].length !== 0

    return disabled
}

function submitRepo(state, data) {
    if (!validRepo(state.currentRepo(), state.repoText())) {
        return
    }

    state.currentRepo.set(data.repo)
}

function setRepo(state, data) {
    state.repoText.set(data.repo.trim())
}

function Render(state) {
    var disabled = !Update.validRepo(state.currentRepo, state.repoText)

    return h(".repo-input", {
        "data-event": [
            mercury.changeEvent(state.events.setRepo),
            mercury.submitEvent(state.events.submitRepo)
        ]
    }, [
        h("span.repo-input__title", "View Issues From"),
        h("input", {
            placeholder: "owner/repo",
            value: state.repoText,
            name: "repo"
        }),
        h("button", {
            disabled: disabled
        }, "load")
    ])
}
