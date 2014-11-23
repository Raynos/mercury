'use strict';

var document = require('global/document');
var mercury = require('../../../index.js');
var cuid = require('cuid');

var Render = require('./render.jsx');

var events = mercury.input(['add', 'changeText', 'toggle']);

var state = mercury.struct({
    description: mercury.value(''),
    list: mercury.array([]),
    events: events
});

events.add(function onAdd(description) {
    state.list.push(mercury.struct({
        id: cuid(),
        description: mercury.value(description),
        done: mercury.value(false)
    }));
});

events.changeText(function onChangeText(data) {
    state.description.set(data.description);
});

events.toggle(function onToggle(data) {
    state.list.some(function toggleItem(item) {
        if (item.id === data.id) {
            item.done.set(!item.done());
            return true;
        }
    });
});

mercury.app(document.body, state, Render);
