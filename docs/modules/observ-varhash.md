Auto generated from observ-varhash at version: 1.0.4.

# observ-varhash [![build status][1]][2]

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
  return Observ(obj)
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
