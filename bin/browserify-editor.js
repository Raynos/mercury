var browserify = require("browserify")
var fs = require("fs")
var path = require("path")
var cuid = require("cuid")

var fileName = process.argv[2]
var src = fs.readFileSync(path.resolve(fileName), "utf8")

var code = "" +
    "var createEditor = require('javascript-editor')\n" +
    "var elem = document.createElement('div')\n" +
    "createEditor({\n" +
    "    container: elem,\n" +
    "    value: " + JSON.stringify(src) + ",\n" +
    "    readOnly: true\n" +
    "})\n"
var loc = path.join(__dirname, cuid() + ".js")
fs.writeFileSync(loc, code)

var bundle = browserify()
bundle.add(path.resolve(fileName))
bundle.add(loc)
var stream = bundle.bundle()
stream.pipe(process.stdout)
stream.on("end", function () {
    fs.unlinkSync(loc)
})
