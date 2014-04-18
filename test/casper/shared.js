var casper = require("casper").create()
var dump = require("utils").dump

function assert(bool, message) {
    if (!bool) {
        throw new Error(message)
    }
}

var uri = "file:///home/raynos/projects/mercury/examples/shared-state.html"
casper.start(uri, function () {
    var info = this.getElementInfo(".content")

    assert(info.text.indexOf("now: ") !== -1, "text content incorrect")

    this.sendKeys(".input", "some text")

    this.wait(50, function () {
        var info = this.getElementInfo(".content")

        assert(info.text.indexOf("now: some text") !== -1,
            "text content not updated")
    })
})

casper.run(function () {
    console.log("OK (shared)")
    this.exit()
})
