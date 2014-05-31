Auto generated from virtual-hyperscript at version: 2.4.0.

# virtual-hyperscript

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

A DSL for creating virtual trees

## Example

```js
var h = require('virtual-hyperscript')

var tree = h('div.foo#some-id', [
    h('span', 'some text'),
    h('input', { type: 'text', value: 'foo' })
])
```

## Docs

See [hyperscript](https://github.com/dominictarr/hyperscript) which has the
  same interface.
  
Except `virtual-hyperscript` returns a virtual DOM tree instead of a DOM
  element.

### `h(selector, properties, children)`

`h()` takes a selector, an optional properties object and an
  optional array of children or a child that is a string.
  
If you pass it a selector like `span.foo.bar#some-id` it will
  parse the selector and change the `id` and `className`
  properties of the `properties` object.
  
If you pass it an array of `children` it will have child
  nodes, normally ou want to create children with `h()`.
  
If you pass it a string it will create an array containing
  a single child node that is a text element.

## Installation

`npm install virtual-hyperscript`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/virtual-hyperscript.png
  [2]: https://travis-ci.org/Raynos/virtual-hyperscript
  [3]: https://badge.fury.io/js/virtual-hyperscript.png
  [4]: https://badge.fury.io/js/virtual-hyperscript
  [5]: https://coveralls.io/repos/Raynos/virtual-hyperscript/badge.png
  [6]: https://coveralls.io/r/Raynos/virtual-hyperscript
  [7]: https://gemnasium.com/Raynos/virtual-hyperscript.png
  [8]: https://gemnasium.com/Raynos/virtual-hyperscript
  [9]: https://david-dm.org/Raynos/virtual-hyperscript.png
  [10]: https://david-dm.org/Raynos/virtual-hyperscript
  [11]: https://ci.testling.com/Raynos/virtual-hyperscript.png
  [12]: https://ci.testling.com/Raynos/virtual-hyperscript
