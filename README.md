# mercury

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

A truly modular frontend framework

To understand what I mean by truly modular just [read the source](https://github.com/Raynos/mercury/blob/master/index.js)

## Examples

### Hello world

```js
var mercury = require("mercury")
var h = mercury.h

var clicks = mercury.input()
var clickCount = mercury.value(0)

clicks(function () {
    clickCount.set(clickCount() + 1)
})

function render(clickCount) {
    return h("div.counter", [
        "The state ", h("code", "clickCount"),
        " has value: " + clickCount + ".", h("input.button", {
            type: "button",
            value: "Click me!",
            "data-click": mercury.event(clicks)
        })
    ])
}

mercury.app(document.body, clickCount, render)

```

### Basic Examples

 - [count](examples/count.js)
 - [shared-state](examples/shared-state.js)
 - [field-reset](examples/field-reset.js)
 - [bmi-counter](examples/bmi-counter.js)
 - [canvas](examples/canvas.js)

### Intermediate Examples

 - [TodoMVC](examples/todomvc)
 - [markdown editor](examples/markdown)
 - [2048 (wip)](https://github.com/Raynos/mercury/tree/2048-wip/examples/2048)
 - [github issues (wip)](https://github.com/Raynos/mercury/tree/github-issues/examples/github-issues-viewer)

## Mercury vs React

`mercury` is similar to react, however it's larger in scope, it is better
  compared against `Om` or `quiescent`
  
 - mercury leverages `virtual-dom` which uses an immutable vdom structure
 - mercury comes with `observ-hash` which uses immutable data for your state atom
 - mercury is truly modular, you can trivially swap out subsets of it for other modules
 - mercury source code itself is maintainable, the modules it uses are all small, well tested and well documented.
    you should not be afraid to use mercury in production as it's easy to maintain & fix.
 - mercury encourages zero dom manipulation in your application code. As far as your application is concerned
    elements do not exist. This means you don't need to reference DOM elements when rendering or when handling
    events
 - mercury is compact, it's 11kb min.gzip.js, that's smaller than backbone.
 - mercury strongly encourages FRP techniques and discourages local mutable state.
 - mercury is highly performant, it's faster then React / Om / ember+htmlbars in multiple benchmarks
    [TodoMVC benchmark](http://matt-esch.github.io/mercury-perf/)\
    [animation benchmark](http://jsfiddle.net/sVPQL/11/) 
    [TodoMVC benchmark source](https://github.com/matt-esch/mercury-perf)
 - mercury comes with FP features like time-travel / easy undo out of the box.
 - mercury is lean, it's an weekend's read at 2.5kloc. (virtual-dom is 1.1kloc, an evening's read.)
    compared to react which is almost 20kloc (a month's read)


## Documentation

WIP. In lieue of documentation please see examples :(

## Installation

`npm install mercury`

## Development

If you want to develop on `mercury` you can clone the code

```sh
git clone git@github.com:Raynos/mercury
cd mercury
npm install
npm test
```

### npm run tasks

 - `npm test` runs the tests
 - `npm run jshint` will run jshint on the code
 - `npm run disc` will open discify (if globally installed)
 - `npm run build` will build the html assets for gh-pages
 - `npm run examples` will start a HTTP server that shows examples
 - `npm run dist` will create a distributed version of mercury

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/mercury.png
  [2]: https://travis-ci.org/Raynos/mercury
  [3]: https://badge.fury.io/js/mercury.png
  [4]: https://badge.fury.io/js/mercury
  [5]: https://coveralls.io/repos/Raynos/mercury/badge.png
  [6]: https://coveralls.io/r/Raynos/mercury
  [7]: https://gemnasium.com/Raynos/mercury.png
  [8]: https://gemnasium.com/Raynos/mercury
  [9]: https://david-dm.org/Raynos/mercury.png
  [10]: https://david-dm.org/Raynos/mercury
  [11]: https://ci.testling.com/Raynos/mercury.png
  [12]: https://ci.testling.com/Raynos/mercury
