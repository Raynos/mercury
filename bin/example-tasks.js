var path = require('path')
var indexhtmlify = require('indexhtmlify')
var browserify = require('browserify')

var browserifyEditor = require('./browserify-editor')

var examplesDir = path.join(__dirname, '..', 'examples')
var examplesTasks = [
    browserifyTask('geometry'),
    browserifyTask('todomvc'),
    browserifyEditorTask('field-reset'),
    browserifyEditorTask('bmi-counter'),
    browserifyEditorTask('shared-state'),
    browserifyEditorTask('react-ballmer'),
    browserifyEditorTask('count')
]

module.exports = examplesTasks

function browserifyTask(folder) {
    var task = {
        src: path.join(examplesDir, folder, 'browser.js'),
        dest: path.join(examplesDir, folder, 'index.html'),
        type: 'browserify',
        name: folder,
        createStream: createStream
    }

    return task

    function createStream() {
        return browserifyBundle(task.src)
            .pipe(indexhtmlify({}))
    }
}

function browserifyEditorTask(file) {
    var task = {
        src: path.join(examplesDir, file + '.js'),
        dest: path.join(examplesDir, file + '.html'),
        type: 'browserify-editor',
        name: file,
        createStream: createStream
    }

    return task

    function createStream() {
        return browserifyEditor(task.src)
            .pipe(indexhtmlify({}))
    }
}

function browserifyBundle(source) {
    var b = browserify()
    b.add(source)
    return b.bundle()
}
