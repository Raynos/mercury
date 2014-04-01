# mercury

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

A truly modular frontend anti framework

To understand what I mean by anti framework just [read the source](https://github.com/Raynos/mercury/blob/master/index.js)

## Example

```js
var mercury = require("mercury")
var h = mercury.h

var delegator = mercury.Delegator()
var inputs = mercury.EventSinks(delegator.id, ["clicks"])
var clickCount = mercury.value(0)

inputs.events.clicks(function () {
    clickCount.set(clickCount() + 1)
})

function render(clickCount) {
    return h("div", [
        "The state ", h("code", "clickCount"), " has value: ",
        clickCount + ".",
        h("input", { type: "button", value: "Click me!",
            "data-click": mercury.event(inputs.sinks.clicks) })
    ])
}

var loop = mercury.main(clickCount(), render)
clickCount(loop.update)
document.body.appendChild(loop.target)
```

## TodoMVC

Check out [frontend-framework TODOMVC implementation](https://github.com/Raynos/frontend-framework/tree/master/todomvc)

## Installation

`npm install mercury`

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
