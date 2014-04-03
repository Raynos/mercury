var browserify = require("browserify")
var fs = require("fs")
var path = require("path")
var cuid = require("cuid")

var fileName = process.argv[2]
var src = fs.readFileSync(path.resolve(fileName), "utf8")

function addLink(href) {
    return "" +
        "var link = document.createElement('link')\n" +
        "link.rel = 'stylesheet'\n" +
        "link.href = '" + href + "'\n" +
        "document.head.appendChild(link)\n"
}

var code = "" +
    "var createEditor = require('javascript-editor')\n" +
    "window.addEventListener('load', function () {\n" +
    "    var editor = createEditor({\n" +
    "        container: elem,\n" +
    "        value: " + JSON.stringify(src) + ",\n" +
    "        readOnly: true\n" +
    "    })\n" +
    "})\n" +
    "var elem = document.createElement('div')\n" +
    "document.body.appendChild(elem)\n" +
    addLink("https://rawgithub.com/maxogden/" +
        "javascript-editor/master/css/codemirror.css") +
    addLink("https://rawgithub.com/maxogden/" +
        "javascript-editor/master/css/theme.css")
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
