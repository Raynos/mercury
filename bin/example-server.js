var http = require('http')
var Router = require('routes-router')
var path = require('path')
var st = require('st')

var tasks = require('./example-tasks.js')
var tasksHash = tasks.reduce(function (acc, task){
    acc[task.name] = task
    return acc
}, {})

var router = Router()

router.addRoute('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html')

    var html = '<ul>\n'
    tasks.forEach(function (task) {
        html += '  <li><a href="/' +
            encodeURIComponent(task.name) + '">' +
            task.name + '</a></li>'
    })
    html += '</ul>'
    res.end(html)
})

router.addRoute('/:name', function (req, res, opts) {
    var task = tasksHash[opts.name]
    if (!task) {
        res.statusCode = 404
        return res.end('Example ' + opts.name + ' Not Found')
    }

    res.setHeader('Content-Type', 'text/html')
    var stream = task.createStream()
    stream.on('error', function (error) {
        console.log('error', error)
        res.end('(' + function (err) {
            throw new Error(err)
        } + '(' + JSON.stringify(error.message) + '))</script>')
    })
    stream.pipe(res)
})

router.addRoute('*', st({
    path: path.dirname(__dirname),
    url: '/mercury',
    cache: false
}))

var server = http.createServer(router)

server.listen(8080)
console.log('listening on port 8080')
