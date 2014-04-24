var raf = require('raf/polyfill');

var Empty = {};

module.exports = rafListen;

function rafListen(observ, fn) {
    var sending = false;

    return observ(onvalue);

    function onvalue(value) {
        currValue = value;
        if (sending) {
            return;
        }

        sending = true;
        raf(send);
    }

    function send() {
        fn(currValue);
        sending = false;
    }
}
