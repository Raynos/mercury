var extend = require("xtend")
var mercury = require("../../index.js")

var GithubIssues = {
    repo: "rails/rails",
    errorMessage: ""
}

module.exports = {
    githubIssues: githubIssues
}

function githubIssues(events, initialState) {
    var state = extend(GithubIssues, initialState || {})

    return mercury.hash({
        repo: mercury.value(state.repo),
        errorMessage: mercury.value(state.errorMessage)
    })
}
