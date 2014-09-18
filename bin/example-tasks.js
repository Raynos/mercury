var path = require('path')
var indexhtmlify = require('indexhtmlify')
var browserify = require('browserify')

var browserifyEditor = require('./browserify-editor')

var examplesDir = path.join(__dirname, '..', 'examples')
var examplesTasks = [
    browserifyTask('geometry'),
    browserifyTask('todomvc'),
    browserifyTask('markdown'),
    browserifyTask('number-input'),
    browserifyTask(path.join(
        'unidirectional',
        'backbone'
    )),
    browserifyTask(path.join(
        'unidirectional',
        'jsx'
    )),
    browserifyTask('login-form'),
    browserifyTask('2048'),
    browserifyEditorTask('field-reset'),
    browserifyEditorTask('bmi-counter'),
    browserifyEditorTask('shared-state'),
    browserifyEditorTask('react-ballmer'),
    browserifyEditorTask('count'),
    browserifyEditorTask('canvas')
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
        var stream = browserifyBundle(task.src)
        var result = stream.pipe(indexhtmlify({ title: task.name }))

        stream.on('error', function (err) {
            result.emit('error', err)
        })

        return result
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
            .pipe(indexhtmlify({ title: task.name }))
    }
}

function browserifyBundle(source) {
    var b = browserify()
    b.add(source)
    return b.bundle()
}
