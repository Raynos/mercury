Auto generated from [vdom-thunk](https://github.com/Raynos/vdom-thunk) package (version 3.0.0).

# vdom-thunk

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

A thunk optimization for virtual-dom

## Example

Use partial when you want to avoid re-rendering subtrees.

`partial` will only re-evaluate the subtree if the arguments
  you pass to it change. This means you should use an immutable
  data structure (like `observ-struct`)

```js
var partial = require("vdom-thunk")

function render(state) {
  return h('div', [
    partial(header, state.head),
    main(),
    partial(footer, state.foot)
  ])
}

function header(head) { ... }
function main() { ... }
function footer(foot) { ... }
```

## Installation

`npm install vdom-thunk`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/vdom-thunk.png
  [2]: https://travis-ci.org/Raynos/vdom-thunk
  [3]: https://badge.fury.io/js/vdom-thunk.png
  [4]: https://badge.fury.io/js/vdom-thunk
  [5]: https://coveralls.io/repos/Raynos/vdom-thunk/badge.png
  [6]: https://coveralls.io/r/Raynos/vdom-thunk
  [7]: https://gemnasium.com/Raynos/vdom-thunk.png
  [8]: https://gemnasium.com/Raynos/vdom-thunk
  [9]: https://david-dm.org/Raynos/vdom-thunk.png
  [10]: https://david-dm.org/Raynos/vdom-thunk
  [11]: https://ci.testling.com/Raynos/vdom-thunk.png
  [12]: https://ci.testling.com/Raynos/vdom-thunk
