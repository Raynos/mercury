Auto generated from observ-array at version: 3.1.0.

# observ-array

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

An array containing observable values

## Example

An `ObservArray` is an observable version of an array, every
  mutation of the array or mutation of an observable element in
  the array will cause the `ObservArray` to emit a new changed
  plain javascript array.

```js
var ObservArray = require("observ-array")
var ObservStruct = require("observ-struct")
var Observ = require("observ")
var uuid = require("uuid")

function createTodo(title) {
  return ObservStruct({
    id: uuid(),
    title: Observ(title || ""),
    completed: Observ(false)
  })
}

var state = ObservStruct({
  todos: ObservArray([
    createTodo("some todo"),
    createTodo("some other todo")
  ])
})

state(function (currState) {
  // currState.todos is a plain javascript todo
  // currState.todos[0] is a plain javascript value
  currState.todos.forEach(function (todo, index) {
    console.log("todo", todo.title, index)
  })
})

state.todos.get(0).title.set("some new title")
state.todos.push(createTodo("another todo"))
```

### Transactions

Batch changes together with transactions.

```js
var array = ObservArray([ Observ("foo"), Observ("bar") ])

var removeListener = array(handleChange)

array.transaction(function(rawList) {
  rawList.push(Observ("foobar"))
  rawList.splice(1, 1, Observ("baz"), Observ("bazbar"))
  rawList.unshift(Observ("foobaz"))
  rawList[6] = Observ("foobarbaz")
})

function handleChange(value) {
  // this will only be called once
  // changes are batched into a single diff
  value._diff //= [ [1,1,"baz","bazbar","foobar", , "foobarbaz"],
              //    [0,0,"foobaz"] ]
}
```

## Installation

`npm install observ-array`

## Contributors

 - Raynos
 - [Matt McKegg][13]

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/observ-array.png
  [2]: https://travis-ci.org/Raynos/observ-array
  [3]: https://badge.fury.io/js/observ-array.png
  [4]: https://badge.fury.io/js/observ-array
  [5]: https://coveralls.io/repos/Raynos/observ-array/badge.png
  [6]: https://coveralls.io/r/Raynos/observ-array
  [7]: https://gemnasium.com/Raynos/observ-array.png
  [8]: https://gemnasium.com/Raynos/observ-array
  [9]: https://david-dm.org/Raynos/observ-array.png
  [10]: https://david-dm.org/Raynos/observ-array
  [11]: https://ci.testling.com/Raynos/observ-array.png
  [12]: https://ci.testling.com/Raynos/observ-array
  [13]: https://github.com/mmckegg
