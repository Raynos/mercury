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

function floatElement(name, float) {
    return "" +
        name + ".style.float = '" + float + "'\n" +
        name + ".style.padding = 0\n" +
        name + ".style.margin = 0\n" +
        name + ".style.width = '50%'\n"
}

var code = "" +
    "var container = document.createElement('div')\n" +
    floatElement("document.body", "left") +
    floatElement("container", "right") +
    "var createEditor = require('javascript-editor')\n" +
    "window.addEventListener('load', function () {\n" +
    "    var editor = createEditor({\n" +
    "        container: container,\n" +
    "        value: " + JSON.stringify(src) + ",\n" +
    "        readOnly: true\n" +
    "    })\n" +
    "})\n" +
    "document.documentElement.appendChild(container)\n" +
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
