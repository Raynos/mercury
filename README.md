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

## Example

```js
var mercury = require("mercury")
var h = mercury.h

var events = mercury.input(["clicks"])
var clickCount = mercury.value(0)

events.clicks(function () {
    clickCount.set(clickCount() + 1)
})

function render(clickCount) {
    return h("div", [
        "The state ", h("code", "clickCount"), " has value: ",
        clickCount + ".",
        h("input", { type: "button", value: "Click me!",
            "data-click": mercury.event(events.clicks) })
    ])
}

mercury.app(document.body, clickCount, render)
```

## TodoMVC

Check out [TODOMVC implementation](examples/todomvc)

## Examples

Some of the `mercury` examples are ports of examples for other
  applications from various projects.

 - Credit goes to @holmsand and reagant contributers for initial
    implementations of the bmi-counter, shared-state, count &
    geometry examples
 - Credit goes to @addyosmani and todomvc contributors for 
    initial implementation of todomvc
 - Credit goes to @gabrielecirulli and 2048 contributors for
    initial implementation of 2048

## Installation

`npm install mercury`

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
