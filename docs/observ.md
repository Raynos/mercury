Auto generated from observ at version: 0.1.6.

# observ

[![build status][1]][2] [![NPM version][3]][4] [![Davis Dependency status][9]][10]

[![browser support][11]][12]

[![NPM][13]][14]

A observable value representation

## Example

```js
var Observable = require("observ")

var v = Observable("initial value")
v(function onchange(newValue) {
  assert.equal(newValue, "new value")
})
v.set("new value")

var curr = v()
assert.equal(curr, "new value")
```


## What about `dominictarr/observable` ?

Both `observ` & `observable` have the same interface of 
 
 - `thing()` gets the value
 - `thing.set(...)` sets the value
 - `thing(function (value) { ... })` listens to the value.

The way `observ` and `observable` differ is in listening.

 - `observ` will ONLY call the listener if `.set()` is invoked.
 - `observable` calls the listener IMMEDIATELY and calls it whenever
  `.set()` is invoked

`observ` can be used in a similar fashion to `observable` by using
  `var watch = require("observ/watch")`. You can then just 
  `watch(thing, function (value) { ... })` and it will call the
  listener immediately

Both `observ` & `observable` have a computed method with the same
  interface.

 - `require("observable").compute`
 - `require("observ/computed")`

## Example computed

```js
var Observable = require("observ")
var computed = require("observ/computed")

var one = Observable(1)
var two = Observable(2)

var together = computed([one, two], function (a, b) {
  return a + b
})

assert.equal(together(), 3)
two.set(5)
assert.equal(together(), 7)
```

## Docs

```ocaml
type Observable<A> := {
    () => A &
    (Function<A>) => void,
    set: (A) => void
}

observ := (A) => Observable<A>
```


## Installation

`npm install observ`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/observ.png
  [2]: https://travis-ci.org/Raynos/observ
  [3]: https://badge.fury.io/js/observ.png
  [4]: https://badge.fury.io/js/observ
  [5]: https://coveralls.io/repos/Raynos/observ/badge.png
  [6]: https://coveralls.io/r/Raynos/observ
  [7]: https://gemnasium.com/Raynos/observ.png
  [8]: https://gemnasium.com/Raynos/observ
  [9]: https://david-dm.org/Raynos/observ.png
  [10]: https://david-dm.org/Raynos/observ
  [11]: https://ci.testling.com/Raynos/observ.png
  [12]: https://ci.testling.com/Raynos/observ
  [13]: http://nodei.co/npm/observ.png
  [14]: http://nodei.co/npm/observ
