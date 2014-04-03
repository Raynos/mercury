var document = require("global/document")

module.exports = doMutableFocus

function doMutableFocus(node, property) {
    if (document.activeElement !== node) {
        node.focus();
    }
}
