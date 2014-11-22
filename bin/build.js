'use strict';

var parallel = require('run-parallel');
var fs = require('fs');
var path = require('path');
var process = require('process');
var logger = require('console');
var examplesTasks = require('./example-tasks.js');

function main() {
    var tasks = examplesTasks.map(function writeTask(task) {
        return function thunk(cb) {
            logger.log('reading', task.src);

            task.createStream()
                .pipe(fs.createWriteStream(task.dest))
                .on('finish', function onFinish() {
                    logger.log('writing', task.dest);
                    cb();
                });
        };
    });

    parallel(tasks, function onTasks(err) {
        if (err) {
            throw err;
        }

        var html = '<ul>\n';
        examplesTasks.forEach(function buildHtml(task) {
            var dest = path.relative(process.cwd(), task.dest);
            html += '    <li><a href="/mercury/' + dest + '">' +
                task.name + '</a></li>\n';
        });
        html += '</ul>\n';

        fs.writeFileSync(
            path.join(process.cwd(), 'index.html'), html);

        logger.log('build finished');
    });
}

if (require.main === module) {
    main();
}
