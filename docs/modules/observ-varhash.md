Auto generated from observ-varhash at version: 0.3.0.

# observ-varhash [![build status][1]][2]

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

An object with observable key value pairs that can be added and removed

## Example

An `ObservVarhash` is a version of `observ-struct` that allows
  adding and removing keys. Mutation of an observable element in
  the hash will cause the `ObservVarhash` to emit a new changed
  plain javascript object.

```js
var ObservVarhash = require("observ-varhash")
var Observ = require("observ")

var people = ObservVarhash({jack: 'Jack'}, function create (obj, key) {
  return Observe(obj)
})

people.put('diane', 'Diane')

console.log(people())
// plain javascript object {jack: 'Jack', diane: 'Diane'}
```

## Installation

`npm install observ-varhash`

## Contributors

 - Nicholas Westlake

API based on [`observ-struct`](https://github.com/Raynos/observ-struct)

## MIT Licenced

  [1]: https://secure.travis-ci.org/nrw/observ-varhash.png
  [2]: https://travis-ci.org/nrw/observ-varhash
  [3]: https://badge.fury.io/js/observ-varhash.png
  [4]: https://badge.fury.io/js/observ-varhash
  [5]: https://coveralls.io/repos/nrw/observ-varhash/badge.png
  [6]: https://coveralls.io/r/nrw/observ-varhash
  [7]: https://gemnasium.com/nrw/observ-varhash.png
  [8]: https://gemnasium.com/nrw/observ-varhash
  [9]: https://david-dm.org/nrw/observ-varhash.png
  [10]: https://david-dm.org/nrw/observ-varhash
  [11]: https://ci.testling.com/nrw/observ-varhash.png
  [12]: https://ci.testling.com/nrw/observ-varhash
