Auto generated from vtree at version: 0.0.22.

# vtree

A realtime tree diffing algorithm

Please note that this now lives under https://github.com/Matt-Esch/virtual-dom and all related issues shoud be opened there. This repository will eventually become a build artifact of `virtual-dom` for developers with an advanced usage pattern.

## Motivation

`vtree` currently exists as part of `virtual-dom`. It is used for imitating
diff operations between two `vnode` structures that imitate the structure of
the active DOM node structure in the browser.

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
