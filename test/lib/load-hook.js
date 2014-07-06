var Module = require('module');

var appRegex = /mercury\.app\([\w\.]+,\s?([\w]+),\s?([\w]+)\)/;

var _compile = Module.prototype._compile;
Module.prototype._compile = transformSource;

function transformSource(source, fileName) {
    if (fileName.indexOf('/examples/') === -1) {
        return _compile.call(this, source, fileName);
    }

    source = source.replace(appRegex, replacer);

    return _compile.call(this, source, fileName);
}

function replacer(match, state, render) {
    return 'module.exports = {\n' +
        '    state: ' + state + ',\n' +
        '    render: ' + render + '\n' +
        '}';
}
