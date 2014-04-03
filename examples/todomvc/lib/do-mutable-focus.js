var document = require("global/document")

module.exports = doMutableFocus

function doMutableFocus(node) {
    if (document.activeElement !== node) {
        node.focus();
    }
}
