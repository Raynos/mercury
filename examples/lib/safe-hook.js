'use strict';

function SafeHook(value) {
    if (!(this instanceof SafeHook)) {
        return new SafeHook(value);
    }

    this.value = value;
}

SafeHook.prototype.hook = function hook(elem, propName) {
    // jscs:disable
    try {
        elem[propName] = this.value;
    } catch (error) {
        /* ignore */
    }
    // jscs:enable
};

module.exports = SafeHook;
