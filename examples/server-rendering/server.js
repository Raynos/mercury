'use strict';

var http = require('http');
var browserify = require('browserify');
var path = require('path');
var create = require('../../index.js').create;
var JSONGlobals = require('json-globals');
var h = require('../../index.js').h;
var logger = require('console');

var render = require('./render.js');

var server = http.createServer(function onReq(req, res) {
    if (req.url === '/bundle.js') {
        res.setHeader('Content-Type', 'application/javascript');
        return browserify()
            .add(path.join(__dirname, 'browser.js'))
            .bundle()
            .pipe(res);
    }

    var state = {
        description: 'server description',
        channels: { add: {} },
        items: [{
            name: 'server item name'
        }]
    };
    var content = render(state);
    var vtree = layout(content, state);

    res.setHeader('Content-Type', 'text/html');
    res.end('<!DOCTYPE html>' + create(vtree).toString());
});

server.listen(8000);
logger.log('listening on port 8000');

function layout(content, state) {
    return h('html', [
        h('head', [
            h('title', 'Server side rendering')
        ]),
        h('body', [
            content,
            h('script', JSONGlobals({
                state: state
            })),
            h('script', {
                src: 'bundle.js'
            })
        ])
    ]);
}
