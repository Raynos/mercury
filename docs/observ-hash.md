Auto generated from observ-hash at version: 2.0.0.

# observ-hash

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
var ObservHash = require("observ-hash")
var Observ = require("observ")
var assert = require("assert")

var state = ObservHash({
    fruits: ObservHash({
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

### `var obj = ObservHash(opts)`

`ObservHash()` takes an object literal of string keys to either
  normal values or observable values.

It returns an `Observ` instance `obj`. The value of `obj` is 
  a plain javascript object where the value for each key is either
  the normal value passed in or the value of the observable for
  that key. 

Whenever one of the observables on a `key` changes the `obj` will
  emit a new object that's a shallow copy with that `key` set to
  the value of the appropiate observable on that `key`.

## Installation

`npm install observ-hash`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/observ-hash.png
  [2]: https://travis-ci.org/Raynos/observ-hash
  [3]: https://badge.fury.io/js/observ-hash.png
  [4]: https://badge.fury.io/js/observ-hash
  [5]: https://coveralls.io/repos/Raynos/observ-hash/badge.png
  [6]: https://coveralls.io/r/Raynos/observ-hash
  [7]: https://gemnasium.com/Raynos/observ-hash.png
  [8]: https://gemnasium.com/Raynos/observ-hash
  [9]: https://david-dm.org/Raynos/observ-hash.png
  [10]: https://david-dm.org/Raynos/observ-hash
  [11]: https://ci.testling.com/Raynos/observ-hash.png
  [12]: https://ci.testling.com/Raynos/observ-hash
