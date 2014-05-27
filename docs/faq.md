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
