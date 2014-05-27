# FAQ

These are frequently asked questions. If you have any questions
  not on this list, then **please** open an issue and ask.

## How do I do custom event handling in mercury

With `mercury` you can assign any event to be a plain function
  and do whatever you want.

```js
h('div', {
    'data-click': function (ev) {
        /* do shit */
    }
})
```

`mercury` also has a special `data-event` which will get called
  for every event trigger on an element

```js
h('div', {
    'data-event': function (ev) {
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

See [DragHandler](examples/geometry/drag-handler.js) as an
  example of a custom higher order event handler.

## How do I do custom rendering

If you want to embed a custom piece of rendering machinery in
  the virtual DOM you can use widgets.

A widget is a object with an `init()` and `update()` method.

```js
function GoogleMapWidget(initialPosition) {
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
  DOM will touch it or its children. However you should never
  touch `elem.parentNode` as that does not belong to the widget

The second method is `update()` if we see a widget and we have
  the same widget in the previous tree we call `update(prev, elem)`
  instead. `update()` is a good place to copy over any stateful
  things from the `prev` widget instance and then to update the
  state with the current properties by accesing them with `this`

For another example of a widget see the
    [canvas demo](examples/canvas.js)

### How do I update custom properties

If you want to update a custom property on a DOM element, like
  calling `setAttribute()` or calling `focus()` then you can
  use a hook

```js
function AttributeHook(attr, value) {
    this.value = value
}

AttributeHook.prototype.hook = function (elem, prop) {
    elem.setAttribute(prop, this.value)
}

h('div', {
    class: AttributeHook('some-class-name')
})
```

For another example of a hook see
    [TodoMVC focus hook](examples/todomvc/lib/do-mutable-focus.js)

## How does `mercury.hash()` unwrapping work

`mercury.hash()` takes an object whose values are either plain
  values or observables.

It then returns both an observable that contains an object
  whose values are all plain values (if it sees any observables
  it just gets the current value of the observables).

The observable it returns also has the same key value properties
  as you passed into `mercury.hash({ ... })`

Example:

```js
var obj = mercury.hash({
  key: 42,
  key2: mercury.value(50)
})

assert.equal(obj.key, 42)
assert.equal(typeof obj.key2, "function")
assert.equal(obj.key2(), 50)
assert.deepEqual(obj(), { key: 42, key2: 50 })
```

When any of the properties passed into `mercury.hash({ ... })` 
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
  another `observ-hash` then when you change a nested property
  on the nested `observ-hash` the hash updates which causes an
  update to the parent hash.

And since `observ-hash` always contains a plain value, the
  parent `observ-hash` will also contain a nested plain value

```js
var obj2 = mercury.hash({
  foo: mercury.hash({
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
