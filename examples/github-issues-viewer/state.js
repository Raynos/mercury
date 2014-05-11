var extend = require("xtend")
var mercury = require("../../index.js")

var Router = require("./components/router.js")

var GithubIssues = {
    repoText: "rails/rails",
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
        route: Router().state,
        repo: mercury.hash({
            value: mercury.value(state.repoText)
        }),
        repoText: mercury.value(state.repoText),
        issues: mercury.array(state.issues),
        errorMessage: mercury.value(state.errorMessage)
    })
}
