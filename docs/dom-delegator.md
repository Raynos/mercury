Auto generated from dom-delegator at version: 7.3.0.

# dom-delegator

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Decorate elements with delegated events

`dom-delegator` allows you to attach an `EventHandler` to 
  a dom element.

When event of the correct type occurs `dom-delegator` will
  invoke your `EventHandler`

This allows you to seperate your event listeners from your
  event writers. Sprinkle your event writers in the template
  in one part of your codebase. Attach listeners to the event
  sources in some other part of the code base.

This decouples the event definition in the DOM from your event
  listeners in your application code.

Also see [`html-delegator`](https://github.com/Raynos/html-delegator)
  for the same idea using html `data-` attributes.

## Example

```html
<div class='foo'>
    <div class='bar'>bar</div>
    <div class='baz'>baz</div>
</div>
```

```js
var document = require("global/document")
var Delegator = require("dom-delegator")
var EventEmitter = require("events").EventEmitter

var del = Delegator()
var emitter = EventEmitter()
emitter.on('textClicked', function (value) {
    // either 'bar' or 'bar' depends on which 
    // `<div>` was clicked
    console.log("doSomething", value.type)
})

var elem = document.querySelector(".foo")

// add individual elems. (in a different file?)
del.addEventListener(elem.querySelector(".bar"), "click", function (ev) {
  emmitter.emit('textClicked', { type: 'bar' })
})
del.addEventListener(elem.querySelector(".baz"), "click", function (ev) {
  emitter.emit('textClicked', { type: 'baz' })
})
```

## Example (global listeners)

Sometimes you don't want to add events bound to an element but
  instead listen to them globally.

```js
var Delegator = require("dom-delegator")

var d = Delegator()
d.addGlobalEventListener("keydown", function (ev) {
    // hit for every global key press
    // can implement keyboard shortcuts


})

d.addEventListener(document.documentElement, "keydown", function (ev) {
    // hit for every keydown that is not captured
    // by an element listener lower in the tree

    // by default dom-delegator does not bubble events up
    // to other listeners on parent nodes

    // you can use global event listeners to intercept everything
    // even if there are listeners lower in the tree
})
```

## Installation

`npm install dom-delegator`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/dom-delegator.png
  [2]: https://travis-ci.org/Raynos/dom-delegator
  [3]: https://badge.fury.io/js/dom-delegator.png
  [4]: https://badge.fury.io/js/dom-delegator
  [5]: https://coveralls.io/repos/Raynos/dom-delegator/badge.png
  [6]: https://coveralls.io/r/Raynos/dom-delegator
  [7]: https://gemnasium.com/Raynos/dom-delegator.png
  [8]: https://gemnasium.com/Raynos/dom-delegator
  [9]: https://david-dm.org/Raynos/dom-delegator.png
  [10]: https://david-dm.org/Raynos/dom-delegator
  [11]: https://ci.testling.com/Raynos/dom-delegator.png
  [12]: https://ci.testling.com/Raynos/dom-delegator
