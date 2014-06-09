var requireModify = require('require-modify');

var appRegex = /mercury\.app\([\w\.]+,\s([\w]+),\s([\w]+)\)/

module.exports = loadExample

function loadExample(fileName) {
    return requireModify(fileName, function (source) {
        source = source.replace(appRegex,
            function (match, state, render) {
                return 'module.exports = {\n' +
                    '    state: ' + state + ',\n' +
                    '    render: ' + render + '\n' +
                    '}'
            })

        return source
    });
}
