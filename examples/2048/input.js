'use strict';

var document = require('global/document');
var Keyboard = require('frp-keyboard');
var keycode = require('keycode');
var computed = require('observ/computed');

var mercury = require('../../index.js');

var operation = {
    'w': 'up',
    'a': 'left',
    's': 'down',
    'd': 'right',
    'left': 'left',
    'right': 'right',
    'up': 'up',
    'down': 'down'
};

module.exports = createInput;

function createInput() {
    var keyboard = Keyboard();
    var events = mercury.input(['resetGame']);

    // list to last pressed keys and emit either a logical
    // operation or 'void'
    events.move = computed([keyboard.keyDown], function (num) {
        return operation[keycode(num)] || 'void';
    });

    // for UX, listen to keydown & prevent default if its one
    // of our logical operations
    document.documentElement.addEventListener('keydown', prevent);

    return events;

    function prevent(ev) {
        if (operation[keycode(ev.keyCode)]) {
            ev.preventDefault();
        }
    }
}
