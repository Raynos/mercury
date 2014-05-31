Auto generated from geval at version: 2.1.1.

# geval

[![build status][1]][2]
[![NPM version][3]][4]
[![Coverage Status][5]][6]
[![Davis Dependency status][9]][10]

[![browser support][11]][12]

An implementation of an event

## Example

```js
var Event = require("geval")
var document = require("global/document")

var clicks = Event(function (broadcast) {
    document.addEventListener("click", function (ev) {
        broadcast(ev)
    })
})

var removeListener = clicks(function listener(ev) {
    console.log('click happened', ev)
})

// later you can call `removeListener()` to stop listening to events
```

## What about [`dominictarr/observable`](https://github.com/dominictarr/observable) ?

Both `geval` and `observable` having a similar interface.

 - `thing(function (ev) { ... })` listens for new values.

The main difference is that `geval` is an `Event`. For discrete 
  events it doesn't make sense to call `thing()` to get the
  current state. Events do not have a notion of current state.

So the `"click"` event doesn't have a `.get()` method because
  clicks do not have a notion of current state that makes sense

However you should not make an `Event` of the windows current
  width & height. You should make an `observable` instead which
  internally listens on the `"resize"` event and sets the correct
  new width & height.

## Motivation

EventEmitter's are complex. They are multiplexed events by default

`Event` is the simpler version of an `EventEmitter`

The main differences are:
  
  - just one event.
  - no implicit string based events
  - forces explicit interfaces with named properties that are
      `Event`'s
  - no inheritance, you don't have to inherit from `Event` like
      you have to inherit from `EventEmitter`.
  - `Event` interface only has public listening functionality,
      this gives a clear seperation between broadcast and listen

Instead of something like

```js
var EventEmitter = require('events').EventEmitter

var stream = new EventEmitter()

stream.on('data', onData)
stream.on('end', onEnd)
stream.on('close', onClose)
```

you can do:

```js
var Event = require('geval')

var stream = {
  ondata: Event(function () { ... }),
  onend: Event(function () { ... }),
  onclose: Event(function () { ... })
}

stream.ondata(onData)
stream.onend(onEnd)
stream.onclose(onClose)
```

Here the benefits are:

 - `stream` is an object of your shape and choice, you can call
      the properties whatever you want. the `[[Prototype]]` can
      be whatever you want.
 - `stream` has three well named properties that can be inspected
      statically or at run time which means the consumer knows
      exactly what type of events are available.
 - A consumer of `stream` could pass the `ondata` event to 
      another object or module without also passing all other
      events along.
 - the `ondata` event is a concrete value. This allows for
      calling higher order functions on the value and enables
      various types of reactive programming techniques. 
 - there are no special `"error"` semantics. There is no magic
      integration with `domain` or `"uncaughtException"`.
 - there is no public `emit()` function on the `stream` interface
      It's impossible for the consumer to emit events that it
      should not be emitting, you know that all events that 
      come out of `ondata` are coming from the actual `stream`
      implementation.

## Docs

### `var removeListener = ev(function listener(value) {})`

```js
var Event = require("geval")

var ev = Event(...)

var removeListener = ev(function listener(value) {
  /* do something with the event value */
})

// call `removeListener()` when you are done with the `ev`.
```

A concrete `ev` is a function which you can pass a `listener`
  to. The `listener` you pass to `ev` will be called with
  an `value` each time an event occurs.

When calling `ev` with a `listener` it will return a 
  `removeListener` function. You can call `removeListener` to
  remove your `listener` function from the event. After you call
  it your listener function will not be called with any future
  values coming from the event.

### `var ev = Event(function broadcaster(broadcast) {})`

```js
var Event = require("geval")

var ev = Event(function broadcaster(broadcast) {
  /* call broadcast with a value */
})
```


`Event` takes a broadcasting function and returns an `event`
  function.

The `broadcasting` function takes one argument, the `broadcast`
  function. The broadcaster can call `broadcast` each time it
  wants to make an event occur. Each time you call `broadcast`
  with a `value`, all listeners that are registered with `ev` 
  will be invoked with the `value`

## Installation

`npm install geval`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/geval.png
  [2]: https://travis-ci.org/Raynos/geval
  [3]: https://badge.fury.io/js/geval.png
  [4]: https://badge.fury.io/js/geval
  [5]: https://coveralls.io/repos/Raynos/geval/badge.png
  [6]: https://coveralls.io/r/Raynos/geval
  [7]: https://gemnasium.com/Raynos/geval.png
  [8]: https://gemnasium.com/Raynos/geval
  [9]: https://david-dm.org/Raynos/geval.png
  [10]: https://david-dm.org/Raynos/geval
  [11]: https://ci.testling.com/Raynos/geval.png
  [12]: https://ci.testling.com/Raynos/geval
