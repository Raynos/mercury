var requireModify = require('require-modify');

var appRegex = /mercury\.app\([\w\.]+,\s([\w]+),\s([\w]+)\)/;

module.exports = loadExample;

function loadExample(fileName) {
    return requireModify(fileName, transformSource);

    function transformSource(source) {
        source = source.replace(appRegex, replacer);

        return source;
    }

    function replacer(match, state, render) {
        return 'module.exports = {\n' +
            '    state: ' + state + ',\n' +
            '    render: ' + render + '\n' +
            '}';
    }
}
