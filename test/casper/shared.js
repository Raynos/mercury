var casper = require("casper").create()
var dump = require("utils").dump
var fs = require("fs")

function assert(bool, message) {
    if (!bool) {
        throw new Error(message)
    }
}

var cwd = fs.workingDirectory
var uri = "file://" + fs.workingDirectory + "/examples/shared-state.html"
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
