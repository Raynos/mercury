Auto generated from vdom-thunk at version: 3.0.0.

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

Use Thunk when you want to avoid re-rendering subtrees.

`Thunk` will only re-evaluate the subtree if the arguments
  you pass to it change. This means you should use an immutable
  data structure (like `observ-struct`)

```js
var Thunk = require("vdom-thunk")

function render(state) {
  return h('div', [
    Thunk(header, state.head),
    main(),
    Thunk(footer, state.foot)
  ])
}

function header(head) { ... }
function main() { ... }
function footer(foot) { ... }
```

The above example demonstrates how we can only evaluate the
  `header()` function when `state.head` changes.

The `Thunk` will internally cache the previous `state.head` and 
  not re-evaluate the expensive `header()` function unless the
  `state.head` state has changed.

## Docs

See [docs.mli][docs] for the jsig type definition

### `var thunk = Thunk(fn, ...args)`

```ocaml
vdom-thunk : (fn: Function<VElem>, ...args: Any) => VThunk
```

`Thunk` takes a `fn` function that returns a virtual node,
  probably created by [`virtual-hyperscript`][hyperscript].

The rest of the arguments passed to `Thunk` will be passed to
  the `fn` you pass.

`Thunk` returns a virtual thunk that can be used in `vtree/diff`
  and in `vdom/create-element` from [`vtree`][vtree] and
  [`vdom`][vdom]

To make placing a `"key"` on a `Thunk` easier, you can set a
  `"key"` or `"id"` property on the second argument to `Thunk`.

This allows you to give a list of keyed `Thunk`'s to `vtree`
  which will increase performance by using the key algorithm
  in the virtual dom diff to move DOM nodes around instead of
  mutating them.

### `var Thunk = partial(eqFunc)`

```ocaml
vdom-thunk/partial : (
    eq: (Array<Any>, Array<Any>) => Boolean
) => (fn: Function<VElem>, ...args: Any) => VThunk
```

`partial` takes a comparison function and returns a `Thunk`
  function as defined above.

You can use `partial` to create your own `Thunk` function with
  a custom comparison function.

Your comparison function should take two arrays of arguments and
  return `true` if the arrays are the same.

The default implementation of this comparison function is 
  shallow comparison of the arrays and checking that the values
  at each index are the exact same reference to an object.

### `var thunk = new ImmutableThunk(fn, args, key, eqFn)

```ocaml
vdom-thunk/immutable-thunk : (
    fn: (...args: Any) => VElem,
    args: Array<Any>,
    key: String | null,
    eqFn: (Array<Any>, Array<Any>) => Boolean
) => VThunk
```

`vdom-thunk` will use `ImmutableThunk` under the hood. The 
  `ImmutableThunk` interface is a lower level interface that
  you can use directly if you want slightly more performance
  or customizability.

It takes a function that will be evaluated to a virtaul element
  for `vtree` and a set of args that it will call the function
  with.

It also takes a key which it sets on the returned `VThunk` and
  the comparison function used to do arguments comparison.


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

  [docs]: https://github.com/Raynos/vdom-thunk/tree/master/README.md
  [hyperscript]: https://github.com/Raynos/virtual-hyperscript
  [vtree]: https://github.com/Matt-Esch/vtree
  [vdom]: https://github.com/Matt-Esch/vdom
