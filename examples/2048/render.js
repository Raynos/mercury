module.exports = render

function render(state) {
    return h(".2048-wrapper", [
        h("link", {
            rel: "stylesheet",
            href: "https://rawgithub.com/raynos/mercury/master/examples/2048/style.css"
        })
    ])
}
