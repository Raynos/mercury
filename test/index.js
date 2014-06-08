var test = require("tape")

var mercury = require("../index")

test("mercury is a object", function (assert) {
    assert.equal(typeof mercury, "object")
    assert.end()
})

require("./synthetic-events.js")
require("./count.js")
