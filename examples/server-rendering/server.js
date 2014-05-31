var http = require('http');
var browserify = require('browserify');
var path = require('path');
var createElement = require('virtual-dom/create-element');
var h = require('../../index.js').h;

var render = require('./render.js');

var server = http.createServer(function (req, res) {
    if (req.url === '/bundle.js') {
        res.setHeader('Content-Type', 'application/javascript')
        return browserify()
            .add(path.join(__dirname, 'browser.js'))
            .bundle()
            .pipe(res)
    }

    var content = render({
        description: 'server description',
        events: { add: {} },
        items: [{
            name: 'server item name'
        }]
    })

    res.setHeader('Content-Type', 'text/html')
    res.end(String(createElement(layout(content))));
});

server.listen(8000);

function layout(content) {
    return h('html', [
        h('head', [
            h('title', 'Server side rendering')
        ]),
        h('body', [
            content,
            h('script', {
                src: 'bundle.js'
            })
        ])
    ])
}
