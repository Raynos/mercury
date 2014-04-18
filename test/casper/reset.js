var casper = require("casper").create()
var dump = require("utils").dump
var fs = require("fs")

function assert(bool, message) {
    if (!bool) {
        throw new Error(message)
    }
}

var uri = "file:///" + fs.workingDirectory + "/examples/field-reset.html"
casper.start(uri, function () {
    this.sendKeys(".input", "some text")

    var t = this.evaluate(function () {
        return document.querySelector(".input").value
    })
    assert(t === "some text", "text is incorrect")

    this.click(".button")

    this.wait(50, function () {
        var t = this.evaluate(function () {
            return document.querySelector(".input").value
        })
        assert(t === "", "text is not empty")
    })
})

casper.run(function () {
    console.log("OK (reset)")
    this.exit()
})
