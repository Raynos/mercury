var extend = require("xtend")
var document = require("global/document")
var mercury = require("../../index.js")

var GithubIssues = {
    repo: "rails/rails",
    errorMessage: "",
    issues: [],
    route: {
        uri: String(document.location) + "/login"
    }
}

module.exports = {
    githubIssues: githubIssues
}

function githubIssues(initialState) {
    var state = extend(GithubIssues, initialState || {})

    return mercury.hash({
        events: mercury.value(null),
        route: mercury.hash({
            uri: mercury.value(state.route.uri),
            fromPopState: mercury.value(false)
        }),
        repo: mercury.hash({
            value: mercury.value(state.repo),
            text: mercury.value(state.repo)
        }),
        issues: mercury.array(state.issues),
        errorMessage: mercury.value(state.errorMessage)
    })
}
