var browserify = require('browserify');
var fs = require('fs');
var path = require('path');
var cuid = require('cuid');
var process = require('process');

function addLink(href) {
    return '' +
        'var link = document.createElement("link")\n' +
        'link.rel = "stylesheet"\n' +
        'link.href = "' + href + '"\n' +
        'document.head.appendChild(link)\n';
}

function floatElement(name, float) {
    return '' +
        name + '.style.float = "' + float + '"\n' +
        name + '.style.padding = 0\n' +
        name + '.style.margin = 0\n' +
        name + '.style.width = "50%"\n';
}

function main(fileName) {
    var src = fs.readFileSync(path.resolve(fileName), 'utf8');

    var code = '' +
        'var container = document.createElement("div")\n' +
        floatElement('document.body', 'left') +
        floatElement('container', 'right') +
        'var createEditor = require("javascript-editor")\n' +
        'window.addEventListener("load", function () {\n' +
        '    var editor = createEditor({\n' +
        '        container: container,\n' +
        '        value: ' + JSON.stringify(src) + ',\n' +
        '        readOnly: true\n' +
        '    })\n' +
        '    container.childNodes[0].style.fontSize = "12px"\n' +
        '    editor.editor.refresh()\n' +
        '})\n' +
        'document.documentElement.appendChild(container)\n' +
        addLink('https://cdn.rawgit.com/maxogden/javascript-editor/' +
            '1835d09bdfe83e5121befe2ff660bc336a520d9a/css/codemirror.css') +
        addLink('https://cdn.rawgit.com/maxogden/javascript-editor/' +
            '1835d09bdfe83e5121befe2ff660bc336a520d9a/css/theme.css');

    var loc = path.join(__dirname, cuid() + '.js');
    fs.writeFileSync(loc, code);

    var bundle = browserify();
    bundle.add(path.resolve(fileName));
    bundle.add(loc);
    var stream = bundle.bundle();
    stream.on('end', function onEnd() {
        fs.unlinkSync(loc);
    });
    return stream;
}

module.exports = main;

if (require.main === module) {
    var fileName = process.argv[2];
    main(fileName).pipe(process.stdout);
}
