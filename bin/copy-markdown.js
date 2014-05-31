var path = require('path');
var fs = require('fs');
var parallel = require('run-parallel');
var series = require('run-series');
var rimraf = require('rimraf');
var spawn = require('child_process').spawn;
var process = require('process');

function gitrun(cmds, cwd, cb) {
    var git = spawn('git', cmds, {
        cwd: cwd
    });
    var buf = [];

    // git.stdout.pipe(process.stdout);
    git.stderr.on('data', function (line) {
        buf.push(line.toString());
    });

    git.on('error', cb);

    git.on('close', function (code) {
        if (code !== 0) {
            cb(new Error('git ' + cmds.join(' ') +
                ' returned with code ' + code));
        }
        cb(null, buf);
    });
}

var docs = path.join(__dirname, '..', 'docs');
var projects = [
    'Raynos/geval',
    'Raynos/dom-delegator',
    'Raynos/value-event',
    'Raynos/observ-array',
    'Raynos/observ-hash',
    'Raynos/observ',
    'Matt-Esch/virtual-dom',
    'Matt-Esch/vtree',
    'Matt-Esch/vdom',
    'Raynos/vdom-thunk',
    'Raynos/virtual-hyperscript',
    'Raynos/main-loop'
];

var tasks = projects.map(function (projectUri) {
    return function (cb) {
        getProject(projectUri, function (err, data) {
            if (err) {
                return cb(err);
            }

            var readme = 'Auto generated from ' + data.name + 
                ' at version: ' + data.package.version + '.\n' +
                '\n' + data.readme;

            fs.writeFile(
                path.join(docs, data.name + '.md'), readme, cb);
        });
    };
});

parallel(tasks, function (err) {
    if (err) {
        throw err;
    }

    console.log('done');
});


function getProject(uri, cb) {
    var projectUri = 'git@github.com:' + uri;
    var parts = uri.split('/');
    var folderName = parts[parts.length - 1];
    var folder = path.join(process.cwd(), folderName);

    series([
        gitrun.bind(null, ['clone', projectUri], process.cwd()),
        parallel.bind(null, {
            readme: fs.readFile.bind(null,
                path.join(folder, 'README.md'), 'utf8'),
            package: fs.readFile.bind(null,
                path.join(folder, 'package.json'), 'utf8')
        })
    ], function (err, results) {
        if (err) {
            return cb(err);
        }

        var data = results[1];

        data.package = JSON.parse(data.package);
        data.name = data.package.name;

        console.log('got', data.name);

        rimraf(folder, function (err) {
            cb(err, data);
        });
    });
}
