# FAQ

These are frequently asked questions. If you have any questions
not on this list, then **please** [open an issue and ask][new-issue].

[new-issue]: https://github.com/Raynos/mercury/issues/new

## What are channels in mercury ?

To handle events in mercury you can can pass a function to your
rendering logic. You pass this function to `ev-click` and
[`dom-delegator`][dom-delegator] will call that function when a
DOM click event happens.

Alternatively, a better way to handle events in mercury is
to create a handle for a function you want to get called when
an event happens. You then pass this handle to your rendering
logic, which passes it to `ev-click` and [`dom-delegator`][dom-delegator]
will call the function associated with the handle.

The advantage of channels is that it's effectively a reference
to a function to call with an event. The nice thing about
this reference is that it's immutable.

Previously the view (the rendering logic) could "cheat" by
calling the function from `mercury.input()` directly with
an event object without going through [`dom-delegator`][dom-delegator].
Now when you create channels you are **guaranteed** that the associated
function only gets called when a **real user** DOM event happens.

This means you can write immutable unidirectional web apps
with mercury and mercury ensures you don't accidentally cheat
or shoot yourself in the foot.

[dom-delegator]: https://github.com/Raynos/dom-delegator

## How do I do custom event handling in mercury

With `mercury` you can assign any event to be a plain function
  and do whatever you want.

```js
h('div', {
    'ev-click': function (ev) {
        /* do shit */
    }
})
```

`mercury` also has a special `ev-event` which will get called
  for every event trigger on an element

```js
h('div', {
    'ev-event': function (ev) {
        if (ev.type === 'keydown') {
            /* do shit */
        } else if (ev.type === 'keyup') {
            /* do other shit */
        }
    }
})
```

You can also write your own custom higher order event handlers
  instead of writing inline functions.

See [DragHandler](https://github.com/Raynos/mercury/blob/master/examples/geometry/lib/drag-handler.js) as an
  example of a custom higher order event handler.

## Can I send one event to multiple channels?

Yes, just assign an array to the event:

```js
h('input.button', {
    type: 'button',
    value: 'Click me!',
    'ev-click': [hg.send(state.channels.first), hg.send(state.channels.second)]
})
```

## How do I do custom rendering

If you want to embed a custom piece of rendering machinery in
  the virtual DOM you can use widgets.

A widget is a object with an `init()` and `update()` method and a `type` attribute with the "Widget" value.

```js
function GoogleMapWidget(initialPosition) {
    this.type = 'Widget'
    this.position = initialPosition
}

GoogleMapWidget.prototype.init = function () {
    var elem = document.createElement('div')
    this.map = GoogleMap(elem)
    this.map.setPosition(this.position)
    return elem
}

GoogleMapWidget.prototype.update = function (prev, elem) {
    this.map = this.map || prev.map
    this.map.setPosition(this.position)
}

h('div', [
    new GoogleMapWidget({ x: 0, y: 0 })
])
```

The rules for a widget is that the first time it's seen we call
  `init()`, we expect `init()` to return a DOM element.

The DOM element you return is yours to keep & mutate, virtual
  DOM will not touch it or its children. However you should never
  touch `elem.parentNode` as that does not belong to the widget

The second method is `update()` if we see a widget and we have
  the same widget in the previous tree we call `update(prev, elem)`
  instead. `update()` is a good place to copy over any stateful
  things from the `prev` widget instance and then to update the
  state with the current properties by accessing them with `this`

For another example of a widget see the
    [canvas demo](examples/canvas.js)

## How do I update custom properties

If you want to update a custom property on a DOM element, like
  calling `setAttribute()` or calling `focus()` then you can
  use a hook

```js
function AttributeHook(value) {
    this.value = value
}

AttributeHook.prototype.hook = function (elem, prop) {
    elem.setAttribute(prop, this.value)
}

h('div', {
    class: new AttributeHook('some-class-name')
})
```

For another example of a hook see
  [TodoMVC focus hook](https://github.com/Raynos/mercury/blob/master/examples/lib/focus-hook.js)

## How do I get life cycle hooks for VNodes

`VNode` only exposes one life cycle mechanism. which is the hook
  mechanism.

### Hooking into VNode creation

If you want to do some custom DOM logic immediately once a VNode
  is created you can add a hook, I normally add them to
  `ev-foo` properties.

```js
function MyHook(args) {
  this.args = args
}

MyHook.prototype.hook = function (elem, propName) {
  /* do DOM stuff */
}

h('div', {
    'ev-myHook': new MyHook(args)
})
```

### Hooking into VNode after it's in the DOM

If you want to a hook to fire after the DOM element has been
  appended into the DOM you will have to delay the hook manually

```js
function MyHook(args) {
  this.args = args
}

MyHook.prototype.hook = function (elem, propName) {
  setImmediate(function () {
    // DOM element will be in the real DOM by now
    // do DOM stuff
  })
}

h('div', {
    'ev-myHook': new MyHook(args)
})
```

We only have one type of hook as maintaining both life cycles
  separately is very complex when it can simply be done at
  the user level with a `setImmediate`

We have the hook fire immediately by default because sometimes
  you need to run DOM logic BEFORE the element is in the DOM.

Firing the hook when the element is in the DOM makes it
  impossible to fire it when it's not in the DOM.

## How does `mercury.struct()` unwrapping work

`mercury.struct()` takes an object whose values are either plain
  values or observables.

It then returns both an observable that contains an object
  whose values are all plain values (if it sees any observables
  it just gets the current value of the observables).

The observable it returns also has the same key value properties
  as you passed into `mercury.struct({ ... })`

Example:

```js
var obj = mercury.struct({
  key: 42,
  key2: mercury.value(50)
})

assert.equal(obj.key, 42)
assert.equal(typeof obj.key2, "function")
assert.equal(obj.key2(), 50)
assert.deepEqual(obj(), { key: 42, key2: 50 })
```

When any of the properties passed into `mercury.struct({ ... })`
  change then the value of the returned observable changes.
  Specifically the value of the observable is updated by updating
  the changed key to the new plain value

```js
obj.key2.set(60)

assert.deepEqual(obj(), { key: 42, key2: 60 })

obj(function listen(newValue) {
  assert.deepEqual(obj(), { key: 42, key2: 70 })
})
obj.key2.set(70)
```

Note that this will work recursively. If you set a value to
  another `observ-struct` then when you change a nested property
  on the nested `observ-struct` the struct updates which causes an
  update to the parent struct.

And since `observ-struct` always contains a plain value, the
  parent `observ-struct` will also contain a nested plain value

```js
var obj2 = mercury.struct({
  foo: mercury.struct({
    bar: mercury.value(10)
  })
})

assert.deepEqual(obj(), { foo: { bar: 10 } })

obj2.foo.bar.set(20)
assert.deepEqual(obj.foo(), { bar: 20 })
assert.deepEqual(obj(), { foo: { bar: 20 } })


obj.foo(function listen(newValue) {
  assert.deepEqual(newValue, { bar: 30 })
})
obj(function listen(newValue)) {
  assert.deepEqual(newValue, { foo: { bar: 30 } })
})

obj.foo.bar.set(30)
```

The same idea also works for `mercury.array()` except that
  is based on arrays instead of objects.

## How do I implement components or widgets (WIP)

This section is a WIP

show Component() -> state { state: state } and Component.render()

### How do I interact with components

show that you can call functions

### But I want to separate my model state from my view state

Talk about having two observables and setting up [computed][]
  relationships

[computed]: ./modules/observ.md#example-computed

### No I really, truly want local state

Talk about how to use [widgets][] and the caveats

[widgets]: ./widgets.md

## How do I avoid deeply nested paths & structures

Sometimes you might run into deeply nested data structures and
  get frustrated with passing around keys & paths to the correct
  thing in your data structure.

Let's say you have a calendar of meetings where each day can have
  multiple meetings.

Let's take a look at what the state might look like for it

```js
var state = mercury.struct({
  calendar: mercury.struct({
    days: mercury.array([
      mercury.struct({
        meetings: mercury.array([
          mercury.struct({
            name: 'meeting name',
            isOpen: mercury.value(false),
            description: 'meeting description'
          }),
          ...
        ])
      })
    ])
  })
})
```

Let's say we want to be able to expand & collapse meetings so
  we might create a UI like:

```js
var events = mercury.input(['meetingToggle'])

events.meetingToggle(function (data) {
  state.calendar.days.get(data.dayIndex)
    .meetings.get(data.meetingIndex).isOpen.set(data.value)
})

function render(calendar) {
  return h('ul', calendar.days.map(function (day, i) {
    return h('li', [
      h('ul', day.meetings.map(function (meeting, j) {
        h('li', [
          h('div', {
            'ev-click': mercury.event(events.meetingToggle, {
              meetingIndex: j,
              dayIndex: i,
              value: !meeting.isOpen
            })
          }, meeting.name),
          h('div', {
            hidden: !meeting.isOpen
          }, meeting.description)
        ])
      }))
    ])
  }))
}
```

There is a problem with this example. We don't really want to
  be writing `calendar.days.get(i).meetings.get(j).isOpen`. That
  is far too long and you don't really care about all that.

There is a second issue here as well. When we embed our
  `'ev-click'` event we have to pass up the `meetingIndex` and
  `dayIndex` because the event handler doesn't have this
  context. This is really annoying because we can't put the
  meeting UI code in a separate function without passing it
  meetingIndex and dayIndex.

### Solution

What we want to do is get rid of the
  `.calendar.days.get(i).meetings.get(j)` path and instead just
  access `state.isOpen()` in the event handler, this is a lot
  cleaner.

The best way to do this is to move the events object from the top
  level down to a lower level, basically embed it locally to
  the meeting so that we can make an assumption about the indices.

The best way to do this is to use a "mercury component" for the
  actual meeting logic.

```js
function MeetingComponent() {
  var events = mercury.input(['toggle']);

  var state = mercury.struct({
    name: 'meeting name',
    isOpen: mercury.value(false),
    description: 'meeting description'
  });

  events.toggle(function (data) {
    state.isOpen.set(data.value);
  });

  return state;
}

MeetingComponent.render = function (state) {
  return h('div', [
    h('div', {
      'ev-click': mercury.event(events.toggle, {
        value: !state.isOpen
      })
    }, state.name),
    h('div', {
      hidden: !state.isOpen
    }, state.description)
  ]);
}
```

Now we've created a local events object for each meeting and have
  completely gotten rid of all the path information.

We'll need to update our top level state and top level render
  logic.


```js
var state = mercury.struct({
  calendar: mercury.struct({
    days: mercury.array([
      mercury.struct({
        meetings: mercury.array([
          MeetingComponent(...)
        ])
      })
    ])
  })
});
```

```js
function render(calender) {
  return h('ul', calendar.days.map(function (day) {
    return h('li', [
      h('ul', day.meetings.map(function (meeting) {
        h('li', [
          MeetingComponent.render(meeting)
        ])
      }))
    ]);
  }));
}
```

Look at how much cleaner this code is. The meeting component's
  rendering logic no longer cares about the index or path in
  the state that it is at.

The MeetingComponent boundary also happened to be a really clean
  place to use functions to separate our code out.

## How do I separate serializable state from application state ? (WIP)

Sometimes you want to be able to just do

```js
appState(function (state) {
  save(state)
})
```

However the `appState` generally contains all the application
  state including local state and transient state that you don't
  really want to save.

The solution to this is to have two different state atoms.
  One for "model" state and one for "application" state.

Another example of this is wanting to synchronize state between
  multiple users, there is some state you want to share but other
  state you don't want to share, for example currently selected
  tab is not something you would want to share

### Example separating serializable state & application state

// TODO

### How do I do routing ?

Use [`mercury-router`](https://github.com/twilson63/mercury-router)
