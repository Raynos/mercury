'use strict';

var hg = require('../../../index.js');
var extend = require('xtend');

module.exports = hg.BaseEvent(handleDrag);

function handleDrag(ev, broadcast) {
    var data = this.data;
    var delegator = hg.Delegator();

    var current = {
        x: ev.offsetX || ev.layerX,
        y: ev.offsetY || ev.layerY
    };

    function onmove(ev) {
        var previous = current;

        current = {
            x: ev.offsetX || ev.layerX,
            y: ev.offsetY || ev.layerY
        };

        var delta = {
            x: current.x - previous.x,
            y: current.y - previous.y
        };

        broadcast(extend(data, delta));
    }

    function onup(ev) {
        delegator.unlistenTo('mousemove');
        delegator.removeGlobalEventListener('mousemove', onmove);
        delegator.removeGlobalEventListener('mouseup', onup);
    }

    delegator.listenTo('mousemove');
    delegator.addGlobalEventListener('mousemove', onmove);
    delegator.addGlobalEventListener('mouseup', onup);
}
