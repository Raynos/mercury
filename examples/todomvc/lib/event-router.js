'use strict';

var window = require('global/window');
var HashRouter = require('hash-router');
var Event = require('geval');

module.exports = EventRouter;

function EventRouter() {
    var router = HashRouter();
    window.addEventListener('hashchange', router);

    return Event(function broadcast(emit) {
        router.on('hash', emit);
    });
}
