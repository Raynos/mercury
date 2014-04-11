var document = require("global/document")

module.exports = MutableFocusHook

function MutableFocusHook() {
    if (!(this instanceof MutableFocusHook)) {
        return new MutableFocusHook()
    }
}

MutableFocusHook.prototype.hook = function (node, property) {
    if (document.activeElement !== node) {
        node.focus();
    }
}
