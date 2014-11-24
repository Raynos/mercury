'use strict';

var Event = require('geval/event');
var createStore = require('weakmap-shim/create-store');

module.exports = WeakmapEvent;

function WeakmapEvent() {
    var store = createStore();

    return {
        broadcast: broadcast,
        listen: listen
    };

    function broadcast(obj, value) {
        getEvent(obj).broadcast(value);
    }

    function listen(obj, fn) {
        getEvent(obj).listen(fn);
    }

    function getEvent(obj) {
        var privates = store(obj);
        privates.event = privates.event || Event();
        return privates.event;
    }
}
