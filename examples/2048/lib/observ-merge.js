'use strict';

var Observ = require('observ');

module.exports = merge;

function merge(observs) {
    var last = observs[observs.length - 1];
    var value = Observ(last());

    function onvalue(v) {
        value.set(v);
    }

    observs.forEach(function (o) {
        o(onvalue);
    });

    return value;
}
