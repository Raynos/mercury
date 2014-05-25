# mercury

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

A truly modular frontend framework

To understand what I mean by truly modular just [read the source](https://github.com/Raynos/mercury/blob/master/index.js)

## Examples

### Hello world

```js
var mercury = require("mercury")
var h = mercury.h

var clicks = mercury.input()
var clickCount = mercury.value(0)

clicks(function () {
    clickCount.set(clickCount() + 1)
})

function render(clickCount) {
    return h("div.counter", [
        "The state ", h("code", "clickCount"),
        " has value: " + clickCount + ".", h("input.button", {
            type: "button",
            value: "Click me!",
            "data-click": mercury.event(clicks)
        })
    ])
}

mercury.app(document.body, clickCount, render)
```

### Basic Examples

 - [count](examples/count.js)
 - [shared-state](examples/shared-state.js)
 - [field-reset](examples/field-reset.js)
 - [bmi-counter](examples/bmi-counter.js)
 - [canvas](examples/canvas.js)

### Intermediate Examples

 - [TodoMVC](examples/todomvc)
 - [markdown editor](examples/markdown)
 - [number-input](examples/number-input)
 - [2048 (wip)](https://github.com/Raynos/mercury/tree/2048-wip/examples/2048)
 - [github issues (wip)](https://github.com/Raynos/mercury/tree/github-issues/examples/github-issues-viewer)

## Modules

`mercury` is a small glue layer that composes a set of modules
  that solves a subset of the frontend problem.

If `mercury` is not ideal for your needs, you should check out
  the individual modules and see if you can re-use something.

Alternatively if the default set of modules in `mercury` doesn't
  work for you, you can just require other modules. It's possible
  to for example, swap out `vtree` with `react` or swap
  out `observ-hash` with `backbone`

### Input, State, Render and Output

There are three pieces to mercury, Input (Controller),
  State (Model) and Render (View).

In a normal mercury app you define your top level Input which
  is a finite list of events.

You then define your top level state "atom". Generally you want
  large fat state object for your entire application. We then
  wire all the events in Input up to some updating logic, i.e.
  every time an event occurs in Input we do some logic and then
  update the State.

Finally we define our Rendering logic as a single function
  that takes the entire state of our application and returns a
  virtual DOM representation of our UI. Every time the state
  changes we just call render and then update the DOM.

You may also need Output for your application, if we want to 
  have some other side effect other then updating the UI, like
  sending a HTTP POST or writing to a websocket or persisting
  to indexedDB. Then we generally listen to changes in the state
  and have our side effect. Note Render is just a specific subset
  of the Output of your application

### Rendering modules (The view layer)

For the view layer mercury uses a set of modules that come
  together and make it easy to work with a Virtual DOM.

In `mercury` the view is just a function that takes your 
  application state and returns a virtual DOM representation.
  This makes writing your view really easy, you just write it
  top to bottom.

`mercury` then uses the following modules to make it really
  performant to use the virtual DOM to update the real DOM.

#### `vtree`

`vtree` is the module that contae ains the data structures for the
  virtual DOM. These are the primitive objects and values that
  the rendering functions in a mercury app will return.

`vtree` also contains the diffing algorithm used in `mercury`.
  Mercury uses a diffing algorithm on a virtual DOM to compute
  a minimal set of `VPatch` records that it can apply to the DOM.

#### `vdom`

`vdom` is the module that contains the `create` and `patch`
  algorithm for turning the `vtree` data structures into real
  DOM objects.

`vdom/create` is used to turn a virtual DOM into a real DOM.
  this is used for the initial rendering of your app.

`vdom/patch` is used to apply a series of `VPatch` records to
  a real DOM element.

You can also use `vdom` and `min-document` together on the 
  server to generate HTML strings. `min-document` is a minimal
  fake DOM for use on the server, you can pass `vdom` any
  `document` you want. In this case `min-document` contains the
  logic to convert it's fake DOM into a HTML string.

#### `virtual-hyperscript`

`virtual-hyperscript` is a module that makes it easier to create
  `VTree` nodes. It basically exports a `h()` function that 
  creates a DSL similar to `jade` (just more brackets ;)).

`virtual-hyperscript` allows you to write your views in an
  expressive manner.

#### `vdom-thunk`

`vdom-thunk` is a module that increases the performance of
  building applications with a virtual DOM system. One of the
  important parts of using a virtual DOM and functional 
  programming in general is to make extensive use of caching.

You can use `vdom-thunk` to effectively memoize a function that
  returns a virtual DOM node. This means if you call it twice
  with the same arguments it will not re-evaluate the function.

This basically means you only have to render that which has 
  changed instead of rendering the entire virtual tree of your
  application.

It should be noted that `vdom-thunk` assumes arguments are
  immutable and thus does an O(1) `===` check to see whether
  the arguments has changed. This will only work if your state
  is immutable.

#### `main-loop`

`main-loop` is another optimization module for a virtual DOM
  system. Normally you would re-create the virtual tree every
  time your state changes. This is not optimum, with `main-loop`
  you will only update your virtual tree at most once per
  request animation frame.

`main-loop` basically gives you batching of your virtual DOM
  changes, which means if you change your model multiple times it
  will be rendered once asynchronously on the next request
  animation frame.

### State modules (The model layer)

In `mercury` we use immutable data structure primitives to
  represent our model. Using immutable data structures allows
  you to use the `vdom-thunk` optimization.

`mercury` uses an observable state representation so that you
  can be notified of any changes.

Generally applications build with mercury will have a single
  top level state "atom". i.e. there is one large state object
  for your application and child components do not have local or
  hidden state. However we can directly embed the state of a
  child component in our top level state "atom" to achieve 
  composition.

#### `observ`

`observ` is the data structure used for observable data. It
  allows you to create a value for which you can listen for 
  changes.

`observ` also comes with higher order functions like `computed`
  that can be used to create new dependent observables. Generally
  these computed observables cannot be directly mutated but 
  instead change when they data they rely on changes.

`observ` is basically an implementation of the `Signal` type
  that is normally used in FRP.

#### `observ-hash`

`observ-hash` is an observable that contains an object with
  a fixed number of keys. Generally the key / value pairs in
  `observ-hash` are themself observables. You can change the
  value of any key in an `observ-hash` and the top level object
  will also change to be a new object with that key changed.

`observ-hash` uses shallow extension to ensure that every time
  the hash changes you get a fresh immutable object.

#### `observ-array`

`observ-array` is an observable that contains an array of
  observables. It's generally recommended that this a
  heterogeanous array. You can change the value of any item in
  the array and the top level array will also change to be a 
  new array.

`observ-array` uses shallow extension to ensure that every time
  the array changes (an item changes or an item is added or 
  removed) you get a fresh immutable array.

`observ-array` has the benefit of being able to add or remove
  items from the array, where as `observ-hash` has a fixed number
  of keys and you cannot add more keys to an `observ-hash`

### Input modules (The controller layer)

In `mercury` we model all the inputs to our application
  explicitely. We define an input object that contains a bunch of
  `geval` Event instances.

Somewhere else in our application we listen to the Input and
  run some logic & update our state when an event happens

#### `geval`

`geval` is our data structure for Events. it gives us a way of
  listening to events and a way of publishing them.

Most the time you will either create a computed Event that
  emits events based on some raw source, like winddow scroll
  events or a websocket. Or you can create a mutable Event which
  you pass to the UI renderer so it can emit events for dynamicly
  created UI components

`geval` is basically an implementation of the `Event` type that
  is normally used in FRP.

#### `dom-delegator`

`dom-delegator` is an event delegator that allows you to seperate
  your event listeners from your event emitters. It sets up 
  global event listeners and allow you to embed event handlers
  on your virtual DOM elements without having to manage adding
  or removing actual event listeners

#### `value-event`

`value-event` allows you to create event handlers that you can
  embed in a virtual DOM. These event handlers work with both
  the native DOM and `dom-delegator`.

`value-event` just contains a set of higher order functions that
  allow you to write to a value to a `geval` Event when some
  user interaction occurs.

Using the higher order functions defined in `value-event` (
  change, submit, etc. ) allows you to not have to write any
  DOM event handling code in your application. `value-event` 
  takes care of all the reading from the DOM

## Motivation

### Mercury vs React

`mercury` is similar to react, however it's larger in scope, it is better
  compard against `Om` or `quiescent`
  
 - mercury leverages `virtual-dom` which uses an immutable vdom structure
 - mercury comes with `observ-hash` which uses immutable data for your state atom
 - mercury is truly modular, you can trivially swap out subsets of it for other modules
 - mercury source code itself is maintainable, the modules it uses are all small, well tested and well documented.
    you should not be afraid to use mercury in production as it's easy to maintain & fix.
 - mercury encourages zero dom manipulation in your application code. As far as your application is concerned
    elements do not exist. This means you don't need to reference DOM elements when rendering or when handling
    events
 - mercury is compact, it's 11kb min.gzip.js, that's smaller than backbone.
 - mercury strongly encourages FRP techniques and discourages local mutable state.
 - mercury is highly performant, it's faster then React / Om / ember+htmlbars in multiple benchmarks
    [TodoMVC benchmark](http://matt-esch.github.io/mercury-perf/)\
    [animation benchmark](http://jsfiddle.net/sVPQL/11/) 
    [TodoMVC benchmark source](https://github.com/matt-esch/mercury-perf)
 - mercury comes with FP features like time-travel / easy undo out of the box.
 - mercury is lean, it's an weekend's read at 2.5kloc. (virtual-dom is 1.1kloc, an evening's read.)
    compared to react which is almost 20kloc (a month's read)

## Documentation

WIP. In lieue of documentation please see examples :(

## Installation

`npm install mercury`

## Development

If you want to develop on `mercury` you can clone the code

```sh
git clone git@github.com:Raynos/mercury
cd mercury
npm install
npm test
```

### npm run tasks

 - `npm test` runs the tests
 - `npm run jshint` will run jshint on the code
 - `npm run disc` will open discify (if globally installed)
 - `npm run build` will build the html assets for gh-pages
 - `npm run examples` will start a HTTP server that shows examples
 - `npm run dist` will create a distributed version of mercury

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/mercury.png
  [2]: https://travis-ci.org/Raynos/mercury
  [3]: https://badge.fury.io/js/mercury.png
  [4]: https://badge.fury.io/js/mercury
  [5]: https://coveralls.io/repos/Raynos/mercury/badge.png
  [6]: https://coveralls.io/r/Raynos/mercury
  [7]: https://gemnasium.com/Raynos/mercury.png
  [8]: https://gemnasium.com/Raynos/mercury
  [9]: https://david-dm.org/Raynos/mercury.png
  [10]: https://david-dm.org/Raynos/mercury
  [11]: https://ci.testling.com/Raynos/mercury.png
  [12]: https://ci.testling.com/Raynos/mercury
