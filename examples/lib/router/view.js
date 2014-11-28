'use strict';

var routeMap = require('route-map');

module.exports = render;

function render(atom, defn, opts) {
    if (opts && opts.base) {
        defn = Object.keys(defn)
            .reduce(function applyBase(acc, str) {
                acc[opts.base + str] = defn[str];
                return acc;
            }, {});
    }

    var match = routeMap(defn);

    var res = match(atom);
    if (!res) {
        throw new Error('router: no match found');
    }

    res.params.url = res.url;
    return res.fn(res.params);
}
