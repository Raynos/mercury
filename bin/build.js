var parallel = require('run-parallel')
var fs = require('fs')
var path = require('path')

var browserify = require('./lib/browserify?')
var browserifyEditor = require('./lib/browserifyEditor?')
var indexhtmlify = require('./lib/indexhtmlify?')


var examplesDir = path.join(__dirname, '..', 'examples')
var examplesTasks = [
    browserifyTask('geometry'),
    browserifyTask('todomvc'),
    browserifyEditorTask('field-reset'),
    browserifyEditorTask('bmi-counter'),
    browserifyEditorTask('shared-state'),
    browserifyEditorTask('react-ballmer'),
    browserifyEditorTask('count')
];

function browserifyTask(folder) {
    return {
        src: path.join(examplesDir, folder, 'browser.js'),
        dest: path.join(examplesDir, folder, 'index.html'),
        type: 'browserify'
    }
}

function browserifyEditorTask(file) {
    return {
        src: path.join(examplesDir, file + '.js'),
        dest: path.join(examplesDir, file + '.html'),
        type: 'browserify-editor'
    }
}

function browserifyEditorHtml(source, dest) {
    return function (cb) {
        browserifyEditor(source)
            .pipe(indexhtmlify())
            .pipe(fs.createWriteStream(dest))
            .once('finish', cb)
    }
}

function browserifyHtml(source, dest) {
    return function (cb) {
        browserify(source)
            .pipe(indexhtmlify())
            .pipe(fs.createWriteStream(dest))
            .once('finish', cb)
    }
}

function main() {
    var tasks = examplesTasks.map(function (task) {
        return task.type === 'browserify' ?
            browserifyHtml(task.src, task.dest) :
            task.type === 'browserify-editor' ?
            browserifyEditorHtml(task.src, task.dest) :
            new Error('Invalid type')
    });

    parallel(tasks, function (err) {
        if (err) {
            throw err
        }

        console.log('build finished')
    })
}

if (require.main === module) {
    main()
}
