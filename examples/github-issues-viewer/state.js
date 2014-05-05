var extend = require("xtend")
var mercury = require("../../index.js")

var GithubIssues = {
    repo: "rails/rails",
    errorMessage: "",
    issues: []
}

module.exports = {
    githubIssues: githubIssues
}

function githubIssues(initialState) {
    var state = extend(GithubIssues, initialState || {})

    return mercury.hash({
        events: mercury.value(null),
        repo: mercury.hash({
            value: mercury.value(state.repo),
            text: mercury.value(state.repo)
        }),
        issues: mercury.array(state.issues),
        errorMessage: mercury.value(state.errorMessage)
    })
}
