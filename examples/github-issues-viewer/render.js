var mercury = require("../../index.js")
var h = mercury.h

var Update = require("./update.js")
var repoInput = require("./components/repo-input.js").Render
var router = require("./lib/router.js")

module.exports = Render

function Render(state) {
    return h(".issue-viewer-wrap", {
        "style": { "visibility": "hidden" }
    }, [
        h("link", {
            rel: "stylesheet",
            href: "/mercury/examples/github-issues-viewer/static/style.css"
        }),
        h(".issue-viewer", [
            repoInput(state.repoInput),
            state.errorMessage ?
                h("h3", "Error loading repo: " + state.errorMessage) :
                null,
            mainContent(state)
        ])
    ])
}

function mainContent(state) {
    return h(".main-view", [
        router({
            "/login": loginPage.bind(null, state.login),
            "/issues/:org/:project": issuesPage.bind(null, state.issues)
        }, {
            route: state.route,
            base: "/mercury/examples/github-issues-viewer"
        })
    ])
}

function loginPage(login, params) {
    return h(".page", [
        h("h2", "login page")
    ])
}

function issuesPage(issues, params) {
    return h(".page .all-issues-page", [
        h(".mypager", "Some pager"),
        h("ul.issue-list",
            issues.map(showIssue.bind(null, params))),
        h(".mypager", "Some pager")
    ])
}

function showIssue(params, issue) {
    var repo = params.org + "/" + params.project
    var href = repo + "/issue/" + issue.id

    return h("li.issue-list__item", [
        h(".issue", [
            h(".issue__left", [
                h("a.issue__header", {
                    href: href
                }, [
                    h("span.issue__id", String(issue.number)),
                    h("span.issue__title", issue.title)
                ]),
                h(".issue__body", Update.teaser(issue.body))
            ]),
            h(".issue__right", [
                h("a.issue__user", {
                    href: issue.user.html_url
                }, [
                    h("img.user__avatar", {
                        src: issue.user.avatar_url
                    }),
                    h("span.user__login", issue.user.login),
                    showLabels(
                        issue.labels,
                        ".issue__labels.labels--vertical"
                    )
                ])
            ])
        ])
    ])
}

function showLabels(labels, className) {
    return h("ul.labels" + className, labels.map(showLabel))

    function showLabel(label) {
        return h("li.labels__label", [
            h("a.label", {
                href: label.url,
                style: {
                    backgroundColor: "#" + label.color
                }
            }, label.name)
        ])
    }
}
