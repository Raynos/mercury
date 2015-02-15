### Input, State, Render and Output

There are three pieces to mercury, Input (Controller),
  State (Model) and Render (View).

In a normal mercury app you define your top level Input which
  is a finite list of events.

You then define your top level state "atom". Generally you want
  a large fat state object for your entire application. We then
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
  and have our side effect. Note that Render is just a specific 
  subset of the Output of your application.

### Rendering modules (The view layer)

For the view layer mercury uses a set of modules that come
  together and make it easy to work with a Virtual DOM.

In `mercury` the view is just a function that takes your 
  application state and returns a virtual DOM representation.
  This makes writing your view really easy, you just write it
  top to bottom.

`mercury` then uses the following modules to make it really
  performant to use the virtual DOM to update the real DOM.

#### [`vtree`][vtree]

[`vtree`][vtree] is the module that contains the data 
  structures for the virtual DOM. These are the primitive 
  objects and values that the rendering functions in a 
  mercury app will return.

[`vtree`][vtree] also contains the diffing algorithm used in 
  `mercury`. Mercury uses a diffing algorithm on a virtual DOM 
  to compute a minimal set of `VPatch` records that it can apply to the DOM.

#### [`vdom`][vdom]

[`vdom`][vdom] is the module that contains the `create` and 
  `patch` algorithm for turning the `vtree` data structures 
  into real DOM objects.

[`vdom/create-element`][vdom-create-element] is used to turn a 
  virtual DOM into a real DOM. this is used for the initial 
  rendering of your app.

[`vdom/patch`][vdom-patch] is used to apply a series of `VPatch` 
  records to a real DOM element.

You can also use [`vdom`][vdom] and 
  [`min-document`][min-document] together on the server to 
  generate HTML strings. [`min-document`][min-document] is a 
  minimal fake DOM for use on the server, you can pass 
  [`vdom`][vdom] any `document` you want. In this case 
  [`min-document`][min-document] contains the logic to convert 
  its fake DOM into a HTML string.

#### [`virtual-hyperscript`][virtual-hyperscript]

[`virtual-hyperscript`][virtual-hyperscript] is a module that 
  makes it easier to create `VTree` nodes. It basically exports 
  a `h()` function that creates a DSL similar to `jade` 
  (just more brackets ;)).

[`virtual-hyperscript`][virtual-hyperscript] allows you to write 
  your views in an expressive manner.

#### [`vdom-thunk`][vdom-thunk]

[`vdom-thunk`][vdom-thunk] is a module that increases the 
  performance of building applications with a virtual DOM 
  system. One of the important parts of using a virtual DOM 
  and functional programming in general is to make extensive 
  use of caching.

You can use [`vdom-thunk`][vdom-thunk] to effectively memoize a 
  function that returns a virtual DOM node. This means if you 
  call it twice with the same arguments it will not re-evaluate 
  the function.

This basically means you only have to render that which has 
  changed instead of rendering the entire virtual tree of your
  application.

It should be noted that [`vdom-thunk`][vdom-thunk] assumes 
  arguments are immutable and thus does an O(1) `===` check 
  to see whether the arguments has changed. This will only 
  work if your state is immutable. Thankfully, 
  [`observ-struct`][observ-struct] is immutable

#### [`main-loop`][main-loop]

[`main-loop`][main-loop] is another optimization module for a 
  virtual DOM system. Normally you would re-create the virtual 
  tree every time your state changes. This is not optimum, 
  with [`main-loop`][main-loop] you will only update your 
  virtual tree at most once per request animation frame.

[`main-loop`][main-loop] basically gives you batching of your 
  virtual DOM changes, which means if you change your model 
  multiple times it will be rendered once asynchronously on 
  the next request animation frame.

### State modules (The model layer)

In `mercury` we use immutable data structure primitives to
  represent our model. Using immutable data structures allows
  you to use the [`vdom-thunk`][vdom-thunk] optimization.

`mercury` uses an observable state representation so that you
  can be notified of any changes.

Generally applications built with mercury will have a single
  top level state "atom". i.e. there is one large state object
  for your application and child components do not have local or
  hidden state. However we can directly embed the state of a
  child component in our top level state "atom" to achieve 
  composition.

#### [`observ`][observ]

[`observ`][observ] is the data structure used for observable 
  data. It allows you to create a value for which you can 
  listen for changes.

[`observ`][observ] also comes with higher order functions 
  like [`observ/computed`][observ-computed] that can be used to 
  create new dependent observables. Generally these computed 
  observables cannot be directly mutated but instead change 
  when they data they rely on changes.

[`observ`][observ] is basically an implementation of the 
  `Signal` type that is normally used in FRP.

#### [`observ-struct`][observ-struct]

[`observ-struct`][observ-struct] is an observable that contains an 
  object with a fixed number of keys. Generally the key-value 
  pairs in [`observ-struct`][observ-struct] are themselves 
  observables. You can change the value of any key in an 
  [`observ-struct`][observ-struct] and the top level object 
  will also change to be a new object with that key changed.

[`observ-struct`][observ-struct] uses shallow extension to ensure 
  that every time the struct changes you get a fresh immutable 
  object.

#### [`observ-array`][observ-array]

[`observ-array`][observ-array] is an observable that contains 
  an array of observables. It's generally recommended that this a
  heterogeneous array. You can change the value of any item in
  the array and the top level array will also change to be a 
  new array.

[`observ-array`][observ-array] uses shallow extension to ensure 
  that every time the array changes (an item changes or an 
  item is added or removed) you get a fresh immutable array.

[`observ-array`][observ-array] has the benefit of being able 
  to add or remove items from the array, where as 
  [`observ-struct`][observ-struct] has a fixed number
  of keys and you cannot add more keys to an 
  [`observ-struct`][observ-struct]

### Input modules (The controller layer)

In `mercury` we model all the inputs to our application
  explicitly. We define an input object that contains a bunch of
  [`geval`][geval] Event instances.

Somewhere else in our application we listen to the Input and
  run some logic and update our state when an event happens.

#### [`geval`][geval]

[`geval`][geval] is our data structure for Events. it gives us 
  a way of listening to events and a way of publishing them.

Most of the time you will either create a computed Event that
  emits events based on some raw source, like winddow scroll
  events or a websocket. Or you can create a mutable Event which
  you pass to the UI renderer so it can emit events for dynamically
  created UI components.

[`geval`][geval] is basically an implementation of the 
  `Event` type that is normally used in FRP.

#### [`dom-delegator`][dom-delegator]

[`dom-delegator`][dom-delegator] is an event delegator that 
  allows you to seperate your event listeners from your 
  event emitters. It sets up global event listeners and 
  allow you to embed event handlers on your virtual DOM 
  elements without having to manage adding or removing 
  actual event listeners.

#### [`value-event`][value-event]

[`value-event`][value-event] allows you to create event 
  handlers that you can embed in a virtual DOM. 
  These event handlers work with both the native DOM and 
  [`dom-delegator`][dom-delegator].

[`value-event`][value-event] contains a set of higher order 
  functions that allows you to write to a value to a 
  [`geval`][geval] Event when some user interaction occurs.

Using the higher order functions defined in 
  [`value-event`][value-event] (change, submit, etc. ) 
  allows you to not have to write any DOM event handling 
  code in your application. [`value-event`][value-event]
  takes care of all the reading from the DOM.




  [graphics]: https://github.com/Raynos/graphics
  [elm]: https://github.com/elm-lang/Elm
  [react]: https://github.com/facebook/react
  [om]: https://github.com/swannodette/om
  [reflex]: https://github.com/Gozala/reflex
  [backbone]: https://github.com/jashkenas/backbone
  [quiescent]: https://github.com/levand/quiescent
  [virtual-dom]: https://github.com/Matt-Esch/virtual-dom

  [vtree]: https://github.com/Matt-Esch/vtree
  [vdom]: https://github.com/Matt-Esch/vdom
  [vdom-create-element]: https://github.com/Matt-Esch/vdom/blob/master/create-element.js
  [vdom-patch]: https://github.com/Matt-Esch/vdom/blob/master/patch.js
  [min-document]: https://github.com/Raynos/min-document
  [virtual-hyperscript]: https://github.com/Raynos/virtual-hyperscript
  [main-loop]: https://github.com/Raynos/main-loop
  [vdom-thunk]: https://github.com/Raynos/vdom-thunk
  [observ]: https://github.com/Raynos/observ
  [observ-computed]: https://github.com/Raynos/observ/blob/master/computed.js
  [observ-struct]: https://github.com/Raynos/observ-struct
  [observ-array]: https://github.com/Raynos/observ-array
  [geval]: https://github.com/Raynos/geval
  [dom-delegator]: https://github.com/Raynos/dom-delegator
  [value-event]: https://github.com/Raynos/value-event

