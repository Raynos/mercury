var h = require("../../index.js").h

module.exports = Render

function Render(state) {
    return h(".issue-viewer-wrap", [
        h("href", {
            "ref": "stylesheet",
            "href": "/mercury/examples/github-issues-viewer/style.css"
        }),
        h(".issue-viewer", [
            repoInput(state),
            state.errorMessage ?
                h("h3", "Error loading repo: " + state.errorMessage) :
                null,
            mainContent(state)
        ])
    ])
}

function repoInput() {
    
}

function mainContent() {
    return h("div", "main content")
}
