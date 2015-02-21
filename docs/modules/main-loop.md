Auto generated from [main-loop](https://github.com/Raynos/main-loop) package (version 3.1.0).

# main-loop

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

A rendering loop for diffable UIs

## Example

```js
var mainLoop = require("main-loop")
var h = require("virtual-dom/h")

var initState = { fruits: ["apple", "banana"], name: "Steve" }

function render(state) {
    return h("div", [
        h("div", [
            h("span", "hello "),
            h("span.name", state.name)
        ]),
        h("ul", state.fruits.map(renderFruit))
    ])

    function renderFruit(fruitName) {
        return h("li", [
            h("span", fruitName)
        ])
    }
}

// set up a loop
var loop = mainLoop(initState, render, {
    create: require("virtual-dom/create-element"),
    diff: require("virtual-dom/diff"),
    patch: require("virtual-dom/patch")
})
document.body.appendChild(loop.target)

// update the loop with the new application state
loop.update({
    fruits: ["apple", "banana", "cherry"],
    name: "Steve"
})
loop.update({
    fruits: ["apple", "banana", "cherry"],
    name: "Stevie"
})
```

## Installation

`npm install main-loop`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/main-loop.png
  [2]: https://travis-ci.org/Raynos/main-loop
  [3]: https://badge.fury.io/js/main-loop.png
  [4]: https://badge.fury.io/js/main-loop
  [5]: https://coveralls.io/repos/Raynos/main-loop/badge.png
  [6]: https://coveralls.io/r/Raynos/main-loop
  [7]: https://gemnasium.com/Raynos/main-loop.png
  [8]: https://gemnasium.com/Raynos/main-loop
  [9]: https://david-dm.org/Raynos/main-loop.png
  [10]: https://david-dm.org/Raynos/main-loop
  [11]: https://ci.testling.com/Raynos/main-loop.png
  [12]: https://ci.testling.com/Raynos/main-loop
