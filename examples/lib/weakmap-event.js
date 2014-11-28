'use strict';

var Event = require('geval/event');
var extend = require('xtend');
var createStore = require('weakmap-shim/create-store');

module.exports = WeakmapEvent;

function WeakmapEvent() {
    var store = createStore();

    listen.asArray = listenAsArray;
    listen.asHash = listenAsHash;

    return {
        broadcast: broadcast,
        listen: listen
    };

    function broadcast(obj, value) {
        getEvent(obj).broadcast(value, obj);
    }

    function listen(obj, fn) {
        getEvent(obj).listen(fn);
    }

    function getEvent(obj) {
        var privates = store(obj);
        privates.event = privates.event || Event();
        return privates.event;
    }

    function listenAsArray(arr, fn) {
        throw new Error('Not Implemented.');
    }

    function listenAsHash(hash, fn) {
        var current = extend(hash);

        Object.keys(hash()).forEach(function listenKey(k) {
            listen(hash[k], fn);
        });

        hash(function onChange(newObj) {
            Object.keys(hash()).forEach(function listenKey(k) {
                if (current[k] !== hash[k]) {
                    listen(hash[k], fn);
                }
            });

            current = extend(hash);
        });
    }
}
