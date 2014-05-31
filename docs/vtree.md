Auto generated from vtree at version: 0.0.2.

# vtree

A realtime tree diffing algorithm

## Motivation

`vtree` currently exists as part of `virtual-dom`. It is used for imitating
diff operations between two `vnode` structures that imitate the structure of
the active DOM node structure in the browser.

This module is currently re-exporting the `vtree` from `virtual-dom`, but the
aim is to eventually make this a standalone module and have `virtual-dom`
depend on `vtree` instead.

## Example

```js
var VNode = require("vtree/vnode")
var diff = require("vtree/diff")

var leftNode = new VNode("div")
var rightNode = new VNode("text")

var patches = diff(leftNode, rightNode)
/*
  -> {
    a: lefNode,
    0: vpatch<REPLACE>(rightNode) // a replace operation for the first node
  }
*/
```

## Installation

`npm install vtree`

## Contributors

 - Matt Esch

## MIT Licenced
