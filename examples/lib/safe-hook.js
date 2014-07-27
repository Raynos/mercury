function SafeHook(value) {
    if (!(this instanceof SafeHook)) {
        return new SafeHook(value);
    }

    this.value = value;
}

SafeHook.prototype.hook = function hook(elem, propName) {
    try {
        elem[propName] = this.value;
    } catch (error) {
        /* ignore */
    }
};

module.exports = SafeHook;
