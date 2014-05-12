var extend = require("xtend")
var mercury = require("../../index.js")

var Router = require("./components/router.js")
var RepoInput = require("./components/repo-input.js")

var GithubIssues = {
    errorMessage: "",
    issues: []
}

module.exports = {
    githubIssues: githubIssues
}

function githubIssues(initialState) {
    var state = extend(GithubIssues, initialState || {})

    return mercury.hash({
        events: null,
        route: Router().state,
        repoInput: RepoInput().state,
        issues: mercury.value(state.issues),
        errorMessage: mercury.value(state.errorMessage)
    })
}
