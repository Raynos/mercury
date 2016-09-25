![mercury](/mercury-logo.png?raw=true)

--------------------------------

[![build status][1]][2]
[![NPM version][3]][4]
[![Coverage Status][5]][6]
[![David Dependency status][9]][10]
[![Gitter][11]][12]
[![Size][13]][14]

[![Sauce Test Status](https://saucelabs.com/browser-matrix/raynos.svg)](https://saucelabs.com/u/raynos)

A truly modular frontend framework

To understand what I mean by truly modular just [read the source](https://github.com/Raynos/mercury/blob/master/index.js)


## Examples

### Hello world

```js
'use strict';

var document = require('global/document');
var hg = require('mercury');
var h = require('mercury').h;

function App() {
    return hg.state({
        value: hg.value(0),
        channels: {
            clicks: incrementCounter
        }
    });
}

function incrementCounter(state) {
    state.value.set(state.value() + 1);
}

App.render = function render(state) {
    return h('div.counter', [
        'The state ', h('code', 'clickCount'),
        ' has value: ' + state.value + '.', h('input.button', {
            type: 'button',
            value: 'Click me!',
            'ev-click': hg.send(state.channels.clicks)
        })
    ]);
};

hg.app(document.body, App(), App.render);
```

### Basic Examples

 - [count](examples/count.js)
 - [shared-state](examples/shared-state.js)
 - [bmi-counter](examples/bmi-counter.js)
 - [canvas](examples/canvas.js)
 - [async-state](examples/async-state.js)
 - [real-dom](examples/real-dom.js)

### Intermediate Examples

 - [TodoMVC](examples/todomvc)
 - [markdown editor](examples/markdown)
 - [number-input](examples/number-input)
 - [serverside rendering](examples/server-rendering)
 - [login form](examples/login-form)
 - [geometry](examples/geometry)
 - [2048 (wip)](https://github.com/Raynos/mercury/tree/2048-wip/examples/2048)
 - [github issues (wip)](https://github.com/Raynos/mercury/tree/github-issues/examples/github-issues-viewer)
 - [hot reloading with browserify or webpack](examples/hot-reload)

### Unidirectional examples

The following examples demonstrate how you can mix & match
  mercury with other frameworks. This is possible because mercury
  is fundamentally modular.

**Disclaimer:** The following are neither "good" nor "bad" ideas.
  Your milage may vary on using these ideas

 - [Backbone + Mercury](examples/unidirectional/backbone)
 - [Immutable + Mercury](examples/unidirectional/immutable)
 - [JSX + Mercury](examples/unidirectional/jsx)

## Motivation

### Mercury vs React

`mercury` is similar to react, however it's larger in scope,
  it is better compared against [`om`][om] or
  [`quiescent`][quiescent]

 - mercury leverages [`virtual-dom`][virtual-dom] which uses
    an immutable vdom structure
 - mercury comes with [`observ-struct`][observ-struct] which uses
    immutable data for your state atom
 - mercury is truly modular, you can trivially swap out
    subsets of it for other modules
 - mercury source code itself is maintainable, the modules it
    uses are all small, well tested and well documented.
    you should not be afraid to use mercury in production
    as it's easy to maintain & fix.
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

## Modules

`mercury` is a small glue layer that composes a set of modules
  that solves a subset of the frontend problem.

If `mercury` is not ideal for your needs, you should check out
  the individual modules and see if you can re-use something.

Alternatively if the default set of modules in `mercury` doesn't
  work for you, you can just require other modules. It's possible
  to for example, swap out [`vtree`][vtree] with
  [`react`][react] or swap out [`observ-struct`][observ-struct]
  with [`backbone`][backbone]

See [the modules README](docs/modules/README.md) for more
  information.

## Documentation

See the [documentation folder](docs)

### FAQ

See the [FAQ document](docs/faq.md)

### API

WIP. In lieu of documentation please see examples :(

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
 - `npm run modules-docs` will (re)generate docs of mercury modules

## Inspirations

A lot of the philosophy and design of `mercury` is inspired by
  the following:

 - [`react`][react] for documenting and explaining the concept
    of a virtual DOM and its diffing algorithm
 - [`om`][om] for explaining the concept and benefits of
    immutable state and time travel.
 - [`elm`][elm] for explaining the concept of FRP and having a
    reference implementation of FRP in JavaScript. I wrote a
    pre-cursor to `mercury` that was literally a
    re-implementation of [`elm`][elm] in javascript
    ([`graphics`][graphics])
 - [`reflex`][reflex] for demonstrating the techniques used to
    implement dynamic inputs.

## Contributors

 - Raynos
 - Matt-Esch
 - neonstalwart
 - parshap
 - nrw
 - kumavis

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/mercury.svg
  [2]: https://travis-ci.org/Raynos/mercury
  [3]: https://badge.fury.io/js/mercury.svg
  [4]: https://badge.fury.io/js/mercury
  [5]: http://img.shields.io/coveralls/Raynos/mercury.svg
  [6]: https://coveralls.io/r/Raynos/mercury
  [7]: https://gemnasium.com/Raynos/mercury.png
  [8]: https://gemnasium.com/Raynos/mercury
  [9]: https://david-dm.org/Raynos/mercury.svg
  [10]: https://david-dm.org/Raynos/mercury
  [11]: https://img.shields.io/badge/GITTER-join%20chat-green.svg
  [12]: https://gitter.im/Raynos/mercury
  [13]: https://badge-size.herokuapp.com/Raynos/mercury/master/dist/mercury.js
  [14]: https://badge-size.herokuapp.com/Raynos/mercury/master/dist/mercury.js

  [graphics]: https://github.com/Raynos/graphics
  [elm]: https://github.com/elm-lang/Elm
  [react]: https://github.com/facebook/react
  [om]: https://github.com/swannodette/om
  [reflex]: https://github.com/Gozala/reflex
  [backbone]: https://github.com/jashkenas/backbone
  [quiescent]: https://github.com/levand/quiescent
  [virtual-dom]: https://github.com/Matt-Esch/virtual-dom
  [vtree]: https://github.com/Matt-Esch/virtual-dom/tree/master/vtree
  [vdom]: https://github.com/Matt-Esch/virtual-dom/tree/master/vdom
  [vdom-create-element]: https://github.com/Matt-Esch/virtual-dom/blob/master/vdom/create-element.js
  [vdom-patch]: https://github.com/Matt-Esch/virtual-dom/blob/master/vdom/patch.js
  [min-document]: https://github.com/Raynos/min-document
  [virtual-hyperscript]: https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript
  [main-loop]: https://github.com/Raynos/main-loop
  [vdom-thunk]: https://github.com/Raynos/vdom-thunk
  [observ]: https://github.com/Raynos/observ
  [observ-computed]: https://github.com/Raynos/observ/blob/master/computed.js
  [observ-struct]: https://github.com/Raynos/observ-struct
  [observ-array]: https://github.com/Raynos/observ-array
  [geval]: https://github.com/Raynos/geval
  [dom-delegator]: https://github.com/Raynos/dom-delegator
  [value-event]: https://github.com/Raynos/value-event
