'use strict';

var setTimeout = require('timers').setTimeout;

function ResetHook(value, sink) {
    if (!(this instanceof ResetHook)) {
        return new ResetHook(value, sink);
    }

    this.value = value;
    this.sink = sink;
}

ResetHook.prototype.hook = function hook(elem, propName) {
    var self = this;
    elem[propName] = self.value;
    setTimeout(function lol() {
        self.sink(false);
    }, 0);
};

module.exports = ResetHook;
