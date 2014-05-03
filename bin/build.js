var parallel = require('run-parallel')
var fs = require('fs')
var indexhtmlify = require('indexhtmlify')
var browserify = require('browserify')

var browserifyEditor = require('./browserify-editor')
var examplesTasks = require('./example-tasks.js')

function browserifyEditorHtml(source, dest) {
    return function (cb) {
        console.log('reading', source)
        var src = browserifyEditor(source)
        src.on('end', function () {
            console.log('writing', dest)
            cb()
        })

        src.pipe(indexhtmlify({}))
            .pipe(fs.createWriteStream(dest))
    }
}

function browserifyHtml(source, dest) {
    return function (cb) {
        console.log('reading', source)
        var src = browserifyBundle(source)
        src.on('end', function () {
            console.log('writing', dest)
            cb()
        })

        src.pipe(indexhtmlify({}))
            .pipe(fs.createWriteStream(dest))
    }
}

function browserifyBundle(source) {
    var b = browserify()
    b.add(source)
    return b.bundle()
}

function main() {
    var tasks = examplesTasks.map(function (task) {
        if (task.type === 'browserify') {
            return browserifyHtml(task.src, task.dest)
        }

        if (task.type === 'browserify-editor') {
            return browserifyEditorHtml(task.src, task.dest)
        }

        throw new Error('invalid type ' + task.type)
    })

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
