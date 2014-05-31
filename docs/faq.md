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
  [TodoMVC focus hook](examples/todomvc/lib/do-mutable-focus.js)

## How do I get life cycle hooks for VNodes

`VNode` only exposes one life cycle mechanism. which is the hook
  mechanism.

### Hooking into VNode creation

If you want to do some custom DOM logic immediately once a VNode
  is created you can add a hook, I normally add them to
  `data-foo` properties.

```js
function MyHook(args) {
  this.args = args
}

MyHook.prototype.hook = function (elem, propName) {
  /* do DOM stuff */
}

h('div', {
    'data-myHook': new MyHook(args)
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
    'data-myHook': new MyHook(args)
})
```

We only have one type of hook as maintaining both life cycles
  seperately is very complex when it can simply be done at
  the user level with a `setImmediate`

We have the hook fire immediately by default because sometimes
  you need to run DOM logic BEFORE the element is in the DOM.

Firing the hook when the element is in the DOM makes it 
  impossible to fire it when it's not in the DOM. 

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

The same idea also works for `mercury.array()` except that
  is based on arrays instead of objects. 
