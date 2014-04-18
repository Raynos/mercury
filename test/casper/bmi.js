// var casper = require("casper").create({
//     onError: console.error,
//     onAlert: console.warn,
//     onLoadError: console.error
// })
// var dump = require("utils").dump

// function assert(bool, message) {
//     if (!bool) {
//         throw new Error(message)
//     }
// }

// var uri = "file:///home/raynos/projects/mercury/examples/bmi-counter.html"
// casper.start(uri, function () {
//     // this.wait(50, function () {
//     //     var elems = this.evaluate(function () {
//     //         return document.querySelectorAll(".slider")
//     //         // this.getElementsInfo(".slider")
//     //     })
//     //     dump(elems)
//     // })

//     // var info = this.getElementInfo(".counter")

//     // assert(info.text.indexOf('value: 0') !== -1, "value not 0")
    
//     // this.click('.button')

//     // this.wait(50, function () {
//     //     var info = this.getElementInfo(".counter")

//     //     assert(info.text.indexOf('value: 1') !== -1,
//     //         "value not 1")
//     // })
// })

// casper.run(function () {
//     console.log("OK (bmi)")
//     this.exit()
// })
