Auto generated from observ-struct at version: 5.0.1.

# observ-struct

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

An object with observable key value pairs

## Example

An observable will emit a new immutable value whenever one of
  its keys changes.

Nested keys will still be the same value if they were not changed
  in that particular `.set()` call.

```js
var ObservStruct = require("observ-struct")
var Observ = require("observ")
var assert = require("assert")

var state = ObservStruct({
    fruits: ObservStruct({
        apples: Observ(3),
        oranges: Observ(5)
    }),
    customers: Observ(5)
})

state(function (current) {
  console.log("apples", current.fruit.apples)
  console.log("customers", current.customers)
})

state.fruits(function (current) {
  console.log("apples", current.apples)
})

var initialState = state()
assert.equal(initialState.fruits.bananas, 5)
assert.equal(initialState.customers, 5)

state.fruits.oranges.set(6)
state.customers.set(5)
state.fruits.apples.set(4)
```

## Docs

### `var obj = ObservStruct(opts)`

`ObservStruct()` takes an object literal of string keys to either
  normal values or observable values.

It returns an `Observ` instance `obj`. The value of `obj` is 
  a plain javascript object where the value for each key is either
  the normal value passed in or the value of the observable for
  that key. 

Whenever one of the observables on a `key` changes the `obj` will
  emit a new object that's a shallow copy with that `key` set to
  the value of the appropiate observable on that `key`.

## Installation

`npm install observ-struct`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/observ-struct.png
  [2]: https://travis-ci.org/Raynos/observ-struct
  [3]: https://badge.fury.io/js/observ-struct.png
  [4]: https://badge.fury.io/js/observ-struct
  [5]: https://coveralls.io/repos/Raynos/observ-struct/badge.png
  [6]: https://coveralls.io/r/Raynos/observ-struct
  [7]: https://gemnasium.com/Raynos/observ-struct.png
  [8]: https://gemnasium.com/Raynos/observ-struct
  [9]: https://david-dm.org/Raynos/observ-struct.png
  [10]: https://david-dm.org/Raynos/observ-struct
  [11]: https://ci.testling.com/Raynos/observ-struct.png
  [12]: https://ci.testling.com/Raynos/observ-struct
