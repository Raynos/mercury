'use strict';

var http = require('http');
var fs = require('fs');
var HttpHashRouter = require('http-hash-router');
var path = require('path');
var st = require('st');
var logger = require('console');

var tasks = require('./example-tasks.js');
var tasksHash = tasks.reduce(function buildHash(acc, task) {
    acc[task.name] = task;
    return acc;
}, {});

var router = HttpHashRouter();

var handler = function exampleHandler(req, res, opts) {
    var name = opts.params.name + ((opts.splat) ? '/' + opts.splat : '');
    var task = tasksHash[name];
    if (!task) {
        res.statusCode = 404;
        return res.end('Example ' + name + ' Not Found');
    }

    res.setHeader('Content-Type', 'text/html');
    var stream = task.createStream();
    stream.on('error', function onError(error) {
        logger.log('error', error);
        res.end('(' + function throwError(err) {
            throw new Error(err);
        } + '(' + JSON.stringify(error.message) + '))</script>');
    });
    stream.pipe(res);
};

var buildList = function buildList(items) {
    var i = 0;
    var l = items.length;
    var list = '<ol class="rounded-list">';
    var name;

    if (!items || !items.length) {
        return ''; // return here if there are no items to render
    }

    for (; i < l; i++) {
        name = items[i].name;
        list += '<li><a href="/' +
            encodeURI(name) + '">' +
            name + '</a></li>'; // make a list item element
    }
    list += '</ol>';

    return list;
};

// Routes handlers
router.set('/', function index(req, res) {
    var filename = path.dirname(__dirname) + '/examples/index.html';
    var buf = fs.readFileSync(filename, 'utf8');

    res.setHeader('Content-Type', 'text/html');

    buf = buf.replace('{{examples}}', buildList(tasks));
    res.end(buf);
});
router.set('/:name', handler);
router.set('/:name/*', handler);
router.set('/mercury/*', st({
    path: path.dirname(__dirname),
    url: '/mercury',
    cache: false
}));

// Server implementation
var server = http.createServer(function handler(req, res) {
    router(req, res, {}, onError);

    function onError(err) {
        if (err) {
            // use your own custom error serialization.
            res.statusCode = err.statusCode || 500;
            res.end(err.message);
        }
    }
});
server.listen(8080);
logger.log('listening on port 8080');
