Auto generated from value-event at version: 2.2.1.

# value-event

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Create DOM event handlers that write to listeners

## Example (event)

```html
<div id='foo'>
  <div class='name'>Bob Steve</div>
  <input class='name' value='Bob Steve'></input>
</div>
```

```js
var event = require('value-event/event')
var listener = function (data) {
  console.log('data', data)
}

var elem = document.getElementById('foo')
elem.querySelector('div.name')
  .addEventListener('click', event(listener, {
    clicked: true
  }))
elem.querySelector('input.name')
  .addEventListener('keypress', event(listener, {
    changed: true
  }))
```

## Example (change)

The cahnge event happens when form elements change

For example:

 - someone types a character in an input field
 - someone checks or unchecks a checkbox

```html
<div id='my-app'>
  <input name='foo' value='bar' />
</div>
```

```js
var changeEvent = require('value-event/change')
var listener = function (data) {
  console.log('data', data.changed, data.foo)
}

var elem = document.getElementById('my-app')
elem
  .addEventListener('input', changeEvent(listener, {
    changed: true
  }))
```

## Example (submit)

The submit event happens when form elements get submitted.

For example:

 - a button gets clicked
 - someone hits ENTER in an input field

```html
<div id='my-app'>
  <input name='foo' value='bar' />
</div>
```

```js
var submitEvent = require('value-event/submit')
var listener = function (data) {
  console.log('data', data.changed, data.foo)
}

var elem = document.getElementById('my-app')
elem
  .addEventListener('keypress', submitEvent(listener, {
    changed: true
  }))
```

## Example (value)

The value event happens whenever the event listener fires.
It attaches input values just like `'submit'` and `'change'`
except it doesn't have special semantics of what's a valid
event.

```html
<div id='my-app'>
  <input name='foo' value='bar' />
</div>
```

```js
var valueEvent = require('value-event/value')
var listener = function (data) {
  // currentValues is { 'foo': 'bar' }
  console.log('data', data.changed, data.foo)
}

var elem = document.getElementById('my-app')
elem.querySelector('input.name')
  .addEventListener('blur', valueEvent(listener, {
    changed: true
  }))
```

## Installation

`npm install value-event`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/value-event.png
  [2]: https://travis-ci.org/Raynos/value-event
  [3]: https://badge.fury.io/js/value-event.png
  [4]: https://badge.fury.io/js/value-event
  [5]: https://coveralls.io/repos/Raynos/value-event/badge.png
  [6]: https://coveralls.io/r/Raynos/value-event
  [7]: https://gemnasium.com/Raynos/value-event.png
  [8]: https://gemnasium.com/Raynos/value-event
  [9]: https://david-dm.org/Raynos/value-event.png
  [10]: https://david-dm.org/Raynos/value-event
  [11]: https://ci.testling.com/Raynos/value-event.png
  [12]: https://ci.testling.com/Raynos/value-event
