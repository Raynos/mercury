var mercury = require("../../index.js")
var xhr = require("xhr")

var liftThunkLatest = require("./lib/observ-lift-thunk-latest.js")

module.exports = Input

function Input(state) {
    var events = mercury.input(["setRepo", "submitRepo"])

    events.newRepo = liftThunkLatest(
        state.repo, fetchRepo)

    return events
}


function fetchRepo(repo) {
    return function (send) {
        var currentPage = 1
        var issues = []

        makeRequest(currentPage)

        function makeRequest(currentPage) {
            var uri = "https://api.github.com/repos/" +
                repo.value + "/issues?page=" + currentPage

            xhr({
                uri: uri,
                method: "GET",
                json: true
            }, onresponse)
        }

        function onresponse(err, response) {
            if (err) {
                return send({ error: err })
            } else if (response && response.statusCode !== 200) {
                var error = new Error(" Request failed " +
                    response.statusCode);
                error.body = response.body
                return send({ error: error })
            } else {
                issues = issues.concat(response.body)

                send({
                    issues: issues
                })

                // got all 30, try next page
                // if (response.body.length === 30) {
                //     currentPage++
                //     makeRequest(currentPage)
                // }
            }
        }
    }
}
