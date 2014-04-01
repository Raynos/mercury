var test = require("tape")

var mercury = require("../index")

test("mercury is a function", function (assert) {
    assert.equal(typeof mercury, "function")
    assert.end()
})
