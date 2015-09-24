# Widgets

Widget is a data type in `virtual-dom` that allows you to get low level with the DOM
  and either optimize your code or handle finely detailed concerns.
  
## Example widget.

```js
var createElement = require('virtual-dom/create-element.js');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var document = require('global/document');

module.exports = PureWrapperWidget;

/*
    A PureWrapperWidget wraps a vnode in a container.
    
    It can do all kinds of DOM specific logic on the
        container if you wanted to. Like handling
        scroll and actual heights in the DOM.
*/
function PureWrapperWidget(vnode) {
    this.currVnode = vnode;
}

var proto = PureWrapperWidget.prototype;
proto.type = 'Widget';

proto.init = function init() {
    var elem = createElement(this.currVnode);
    var container = document.createElement('div');
    container.appendChild(elem);
    return container;
};

proto.update = function update(prev, elem) {
    var prevVnode = prev.currVnode;
    var currVnode = this.currVnode;
    
    var patches = diff(prevVnode, currVnode);
    var rootNode = elem.childNodes[0];
    var newNode = patch(rootNode, patches);
    if (newNode !== elem.childNodes[0]) {
        elem.replaceChild(newNode, elem.childNodes[0]);
    }
};
```
