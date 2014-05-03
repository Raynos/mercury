var parallel = require('run-parallel')
var fs = require('fs')
var examplesTasks = require('./example-tasks.js')

function main() {
    var tasks = examplesTasks.map(function (task) {
        return function (cb) {
            console.log('reading', task.src)

            task.createStream()
                .pipe(fs.createWriteStream(task.dest))
                .on('finish', function () {
                    console.log('writing', task.dest)
                    cb()
                })
        }
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
